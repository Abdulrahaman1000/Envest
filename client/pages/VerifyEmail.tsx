import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboardingStore';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { accountData } = useOnboardingStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join('');
    if (verificationCode.length === 6) {
      navigate('/kyc');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-4 mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Verify email address</h1>
          <p className="text-sm text-slate-400">
            Enter the code sent to {accountData.email}
          </p>
        </div>

        <Card className="border-0 bg-slate-800 p-6 space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold rounded-lg border-2 border-slate-600 bg-slate-700 text-white focus:border-yellow-400 focus:outline-none"
              />
            ))}
          </div>

          <Button
            onClick={handleVerify}
            disabled={code.some((digit) => !digit)}
            className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500 disabled:opacity-50"
          >
            Verify
          </Button>

          <div className="text-center">
            <p className="text-sm text-slate-400">
              Didn't receive code?{' '}
              <button className="text-yellow-400 hover:underline">
                Resend
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
