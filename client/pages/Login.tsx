import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login
    setUser({
      id: '1',
      email,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+234 801 000 0000',
    });

    navigate('/home');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-4 mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <p className="text-sm text-slate-400">Welcome back to EnVest</p>
        </div>

        <Card className="border-0 bg-slate-800 p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: '' }));
                }
              }}
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <Button
            onClick={() => navigate('/forgot-password')}
            variant="ghost"
            className="w-full text-yellow-400 hover:bg-slate-700 p-0 h-auto justify-start"
          >
            Forgot password?
          </Button>

          <Button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
          >
            Login
          </Button>
        </Card>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-900 px-2 text-slate-400">Or</span>
            </div>
          </div>

          <Button
            onClick={() => navigate('/face-id')}
            variant="outline"
            className="w-full border-slate-600 text-white hover:bg-slate-700"
          >
            Use Face ID
          </Button>
        </div>

        <p className="text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/create-account')}
            className="text-yellow-400 hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}
