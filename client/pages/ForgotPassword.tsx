import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';
import { FormInput } from '@/components/FormInput';
import { forgotPasswordSchema, ForgotPasswordValues } from '@/lib/validations/auth';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log('Resetting password for:', data.email);
    navigate('/verify-email');
  };

  return (
    <AuthLayout
      title="Forget password"
      subtitle="Enter your email address"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Email address"
          placeholder="Email address"
          required
          {...register('email')}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-base font-semibold"
        >
          Continue
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => {/* handle phone flow */}}
            className="text-[#B8860B] text-sm font-bold hover:underline"
          >
            Use phone number instead
          </button>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}