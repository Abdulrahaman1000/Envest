import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';
import { FormInput } from '@/components/FormInput';
import { signUpSchema, SignUpValues } from '@/lib/validations/auth';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { useSignUp } from '@/hooks/useAuth';

export default function CreateAccount() {
  const navigate = useNavigate();
  const { updateAccountData } = useOnboardingStore();
  const { mutate: signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpValues) => {
    updateAccountData(data);
    signUp(data);
  };

  return (
    <AuthLayout
      title="Sign up"
      subtitle="Please fill the forms below to create an account."
      showLogo
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

        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="••••••"
          required
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-base font-semibold mt-2"
        >
          Sign up
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
          Have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-[#B8860B] hover:underline font-bold"
          >
            Login
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}