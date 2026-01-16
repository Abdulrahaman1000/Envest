import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';
import { FormInput } from '@/components/FormInput';
import { completeProfileSchema, CompleteProfileValues } from '@/lib/validations/auth';
import { useCompleteProfile } from '@/hooks/useAuth';
import { Camera, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function CompleteProfile() {
    const navigate = useNavigate();
    const { mutate: completeProfile, isPending } = useCompleteProfile();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CompleteProfileValues>({
        resolver: zodResolver(completeProfileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
        },
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
        completeProfile(data);
    };

    return (
        <AuthLayout
            title="Complete your profile"
            subtitle="Please enter the info to complete your profile. This information is only visible to you."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-100 overflow-hidden">
                            {previewImage ? (
                                <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-slate-400">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 w-8 h-8 bg-[#B8860B] rounded-full flex items-center justify-center cursor-pointer border-2 border-white text-white hover:bg-[#966F09]"
                        >
                            <Camera size={16} />
                            <input
                                type="file"
                                id="profile-image"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                <FormInput
                    label="First name"
                    placeholder="Enter first name"
                    required
                    {...register('firstName')}
                    error={errors.firstName?.message}
                />

                <FormInput
                    label="Last name"
                    placeholder="Enter last name"
                    required
                    {...register('lastName')}
                    error={errors.lastName?.message}
                />

                <div className="space-y-1.5 w-full">
                    <label className="text-slate-700 font-semibold text-sm">
                        Phone number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 border border-slate-200 rounded-xl px-3 h-12 bg-slate-50 text-slate-700 font-medium">
                            <span className="text-xl">🇳🇬</span>
                            <span className="text-sm">+234</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </div>
                        <FormInput
                            label="" // Hidden label
                            placeholder="00-0000-0000"
                            required
                            {...register('phone')}
                            error={errors.phone?.message}
                            className="flex-1"
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-lg font-semibold mt-4"
                >
                    {isPending ? 'Processing...' : 'Finish Registration'}
                </Button>

                <div className="flex justify-center mt-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}
