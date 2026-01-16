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
    // In a real app, we would send the email here
    navigate('/verify-email');
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput
          label="Email address"
          placeholder="Email address"
          required
          {...register('email')}
          error={errors.email?.message}
        />

        <Button
          type="submit"
          className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-lg font-semibold"
        >
          Send Reset Code
        </Button>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm bg-slate-100 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={16} />
            Go Back to Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
