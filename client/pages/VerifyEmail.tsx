import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthLayout from '@/components/AuthLayout';
import { OTPInput } from '@/components/OTPInput';
import { otpSchema, OTPValues } from '@/lib/validations/auth';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { ArrowLeft } from 'lucide-react';
import { useVerifyOtp } from '@/hooks/useAuth';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { accountData } = useOnboardingStore();
  const [timeLeft, setTimeLeft] = useState(45);
  const { mutate: verifyOtp } = useVerifyOtp();

  const {
    control,
    handleSubmit,
    formState: { },
  } = useForm<OTPValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = (data: OTPValues) => {
    verifyOtp(data.code);
  };

  return (
    <AuthLayout
      title="Code verification"
      subtitle={`We sent you a code to ${accountData.email.replace(/(.{1}).*(@.*)/, '$1***$2')}. Please enter that code in the field below:`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <OTPInput
              value={field.value}
              onChange={field.onChange}
              length={6}
            />
          )}
        />

        <div className="text-center">
          <p className="text-slate-500 text-sm font-medium">
            Didn't receive it?{' '}
            <span className="text-[#B8860B] font-bold">
              Resend code in {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm bg-slate-100 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
