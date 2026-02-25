import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import { ArrowLeft } from 'lucide-react';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'otp' | 'new-password' | 'success'>('otp');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(45);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (step === 'otp') {
    return (
      <AuthLayout
        title="Verify Account"
        subtitle="Enter the  6 digit code sent to +234 810 **** 067"
      >
        <div className="space-y-8">
          {/* OTP Boxes */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-bold rounded-xl border-2 border-slate-200 bg-white text-slate-800 focus:border-[#B8860B] focus:outline-none transition-colors"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-500 text-sm font-medium">
              Didn't receive it?{' '}
              <button
                type="button"
                onClick={() => { if (timeLeft <= 0) setTimeLeft(45); }}
                disabled={timeLeft > 0}
                className="text-[#B8860B] font-bold hover:underline disabled:cursor-default"
              >
                Resend code in {formatTime(timeLeft)}
              </button>
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/forgot-password')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Go Back
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (step === 'new-password') {
    return (
      <AuthLayout
        title="Create new password"
        subtitle="Your new password must be different from your previous password"
      >
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">New Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                placeholder="••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 h-11 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder:text-slate-300 pr-10"
              />
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? '👁' : '🙈'}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 h-11 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder:text-slate-300 pr-10"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showConfirm ? '👁' : '🙈'}
              </button>
            </div>
          </div>

          <button
            onClick={() => { if (newPassword && newPassword === confirmPassword) setStep('success'); }}
            className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-base font-semibold mt-2 transition-colors"
          >
            Reset Password
          </button>

          <div className="flex justify-center">
            <button onClick={() => setStep('otp')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors">
              <ArrowLeft size={15} />
              Go Back
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Success step
  return (
    <AuthLayout title="Password Reset Successful" subtitle="You can now log in with your new password">
      <div className="flex flex-col items-center gap-5 py-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">✅</div>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-[#B8860B] hover:bg-[#966F09] text-white h-12 rounded-xl text-base font-semibold transition-colors"
        >
          Go to Login
        </button>
      </div>
    </AuthLayout>
  );
}