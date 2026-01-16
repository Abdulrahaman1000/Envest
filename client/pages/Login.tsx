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
      title="Login"
      subtitle="Welcome back to EnVest"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email address"
          placeholder="Email address"
          required
          {...register('email')}
          error={errors.email?.message}
        />

        <div className="space-y-1">
          <FormInput
            label="Password"
            type="password"
            placeholder="******"
            required
            {...register('password')}
            error={errors.password?.message}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-[#B8860B] text-sm font-bold hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-lg font-semibold mt-2"
        >
          Login
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500 font-medium">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-12 border-slate-200 rounded-xl flex items-center gap-2 font-semibold text-slate-700"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5" />
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 border-slate-200 rounded-xl flex items-center gap-2 font-semibold text-slate-700"
          >
            <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
            Apple
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm font-medium">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/create-account')}
              className="text-[#B8860B] hover:underline font-bold"
            >
              Create one
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
