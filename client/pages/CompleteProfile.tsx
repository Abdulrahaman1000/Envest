import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '@/components/AuthLayout';
import { FormInput } from '@/components/FormInput';
import { completeProfileSchema, CompleteProfileValues } from '@/lib/validations/auth';
import { useCompleteProfile } from '@/hooks/useAuth';
import { Camera, ArrowLeft } from 'lucide-react';

export default function CompleteProfile() {
  const navigate = useNavigate();
  const { mutate: completeProfile, isPending } = useCompleteProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CompleteProfileValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: { firstName: '', lastName: '', phone: '' },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setValue('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: CompleteProfileValues) => {
    setShowSuccess(true);
    // completeProfile(data);
  };

  return (
    <div className="relative">
      <AuthLayout
        title="Complete your profile"
        subtitle="Please enter the info to complete your profile. This information is only visible to you."
        showLogo
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Avatar Upload */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200 overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="#94a3b8">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                )}
              </div>
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 w-7 h-7 bg-[#B8860B] rounded-full flex items-center justify-center cursor-pointer border-2 border-white text-white hover:bg-[#966F09] transition-colors"
              >
                <Camera size={13} />
                <input type="file" id="profile-image" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </div>

          <FormInput
            label="First name"
            placeholder="Email address"
            required
            {...register('firstName')}
            error={errors.firstName?.message}
          />

          <FormInput
            label="Last name"
            placeholder="••••••"
            required
            {...register('lastName')}
            error={errors.lastName?.message}
          />

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-slate-700 font-semibold text-sm">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-stretch gap-2">
              <div className="flex items-center gap-1.5 border border-slate-200 rounded-xl px-3 h-11 bg-white text-slate-700 font-medium shrink-0 cursor-pointer hover:bg-slate-50 transition-colors">
                <span className="text-lg">🇳🇬</span>
                <span className="text-sm">+234</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <input
                placeholder="00-0000-0000"
                {...register('phone')}
                className="flex-1 border border-slate-200 rounded-xl px-4 h-11 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder:text-slate-300 w-0"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-base font-semibold mt-2 transition-colors disabled:opacity-60"
          >
            {isPending ? 'Processing...' : 'Finish Registration'}
          </button>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Go Back
            </button>
          </div>
        </form>
      </AuthLayout>

      {/* "You are all set" overlay modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm text-center">
            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-[#B8860B]" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="w-3 h-3 rounded-full bg-slate-200" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">You are all set!</h2>
            <p className="text-sm text-slate-500">Hold on while we set up your account</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-6 w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-11 rounded-xl text-sm font-semibold transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}