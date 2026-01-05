import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboardingStore';

export default function CreateAccount() {
  const navigate = useNavigate();
  const { accountData, updateAccountData } = useOnboardingStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateAccountData({ [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    const newErrors: Record<string, string> = {};

    if (!accountData.email) newErrors.email = 'Email is required';
    if (!accountData.firstName) newErrors.firstName = 'First name is required';
    if (!accountData.lastName) newErrors.lastName = 'Last name is required';
    if (!accountData.password) newErrors.password = 'Password is required';
    if (!accountData.phone) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/verify-email');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-4 mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="text-sm text-slate-400">Set up your EnVest account</p>
        </div>

        <Card className="border-0 bg-slate-800 p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={accountData.email}
              onChange={handleChange}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              First Name
            </label>
            <Input
              name="firstName"
              placeholder="John"
              value={accountData.firstName}
              onChange={handleChange}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.firstName && (
              <p className="text-xs text-red-400">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Last Name
            </label>
            <Input
              name="lastName"
              placeholder="Doe"
              value={accountData.lastName}
              onChange={handleChange}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.lastName && (
              <p className="text-xs text-red-400">{errors.lastName}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Phone Number
            </label>
            <Input
              name="phone"
              placeholder="+234 801 000 0000"
              value={accountData.phone}
              onChange={handleChange}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.phone && (
              <p className="text-xs text-red-400">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="••••••••"
              value={accountData.password}
              onChange={handleChange}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <Button
            onClick={handleNext}
            className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
          >
            Continue
          </Button>
        </Card>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-yellow-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
