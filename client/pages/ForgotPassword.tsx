import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/reset-password');
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-6">
      <button
        onClick={() => navigate('/login')}
        className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="flex-1 max-w-sm w-full mx-auto space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
          <p className="text-sm text-slate-400">
            Enter your email to reset your password
          </p>
        </div>

        <Card className="border-0 bg-slate-800 p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
          >
            Send Reset Code
          </Button>
        </Card>
      </div>
    </div>
  );
}
