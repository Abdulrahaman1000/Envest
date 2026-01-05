import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'email' | 'otp' | 'new-password' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailSubmit = () => {
    if (email) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = () => {
    if (otp.every((digit) => digit)) {
      setStep('new-password');
    }
  };

  const handlePasswordSubmit = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setStep('success');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-4 mx-auto">
        {step === 'email' && (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Reset password</h1>
              <p className="text-sm text-slate-400">
                Enter your email address
              </p>
            </div>

            <Card className="border-0 bg-slate-800 p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                onClick={handleEmailSubmit}
                className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
              >
                Continue
              </Button>
            </Card>
          </>
        )}

        {step === 'otp' && (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
              <p className="text-sm text-slate-400">
                Enter the code sent to {email}
              </p>
            </div>

            <Card className="border-0 bg-slate-800 p-6 space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 h-12 text-center text-2xl font-bold rounded-lg border-2 border-slate-600 bg-slate-700 text-white focus:border-yellow-400 focus:outline-none"
                  />
                ))}
              </div>

              <Button
                onClick={handleOtpSubmit}
                className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
              >
                Verify
              </Button>
            </Card>
          </>
        )}

        {step === 'new-password' && (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">New password</h1>
              <p className="text-sm text-slate-400">Create a new password</p>
            </div>

            <Card className="border-0 bg-slate-800 p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  New Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                onClick={handlePasswordSubmit}
                className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
              >
                Reset Password
              </Button>
            </Card>
          </>
        )}

        {step === 'success' && (
          <Card className="border-0 bg-slate-800 p-6 flex flex-col items-center justify-center space-y-6 min-h-96">
            <div className="text-5xl">✓</div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">
                Password reset successful
              </h2>
              <p className="text-slate-400">
                You can now login with your new password
              </p>
            </div>
            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
            >
              Go to Login
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
