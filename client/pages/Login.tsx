import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';
import { FormInput } from '@/components/FormInput';
import { loginSchema, LoginValues } from '@/lib/validations/auth';
import { useLogin } from '@/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { mutate: login } = useLogin();
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginValues) => {
    login(data);
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Enter your email and password to access your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email address"
          placeholder="Email address"
          required
          {...register('email')}
          error={errors.email?.message}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="••••••"
          required
          {...register('password')}
          error={errors.password?.message}
        />

        {/* Remember me + Forgot Password row */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded accent-yellow-500 border-slate-300"
            />
            <span className="text-sm text-slate-600 font-medium">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-[#B8860B] text-sm font-bold hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-base font-semibold mt-2"
        >
          Login
        </Button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-medium">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-12 border-slate-200 rounded-xl flex items-center justify-center gap-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 border-slate-200 rounded-xl flex items-center justify-center gap-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
            Apple
          </Button>
        </div>

        <p className="text-center text-slate-500 text-sm font-medium mt-4">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/create-account')}
            className="text-[#B8860B] hover:underline font-bold"
          >
            Sign up
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}