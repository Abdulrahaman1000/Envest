import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';

export default function FaceID() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [status, setStatus] = useState<'scanning' | 'recognized' | 'failed'>('scanning');

  useEffect(() => {
    // Simulate face scanning
    const timer = setTimeout(() => {
      setStatus('recognized');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = () => {
    // Simulate login
    setUser({
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+234 801 000 0000',
      faceVerified: true,
    });

    navigate('/home');
  };

  const handleRetry = () => {
    setStatus('scanning');
    setTimeout(() => {
      setStatus('recognized');
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-4 mx-auto">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Face ID Login</h1>
          <p className="text-sm text-slate-400">
            Look at your screen to authenticate
          </p>
        </div>

        <Card className="border-0 bg-slate-800 p-6 flex flex-col items-center justify-center space-y-6 min-h-96">
          <div className="relative w-32 h-32">
            <div className="w-full h-full rounded-full border-4 border-yellow-400 flex items-center justify-center">
              {status === 'scanning' && (
                <div className="text-4xl animate-pulse">📷</div>
              )}
              {status === 'recognized' && (
                <div className="text-4xl">✓</div>
              )}
              {status === 'failed' && (
                <div className="text-4xl">✗</div>
              )}
            </div>
          </div>

          <div className="text-center space-y-2">
            {status === 'scanning' && (
              <>
                <h2 className="text-xl font-bold text-white">Scanning face</h2>
                <p className="text-slate-400">
                  Please wait while we scan your face
                </p>
              </>
            )}
            {status === 'recognized' && (
              <>
                <h2 className="text-xl font-bold text-white">Face recognized</h2>
                <p className="text-slate-400">
                  Your face has been successfully recognized
                </p>
              </>
            )}
            {status === 'failed' && (
              <>
                <h2 className="text-xl font-bold text-white">Face not recognized</h2>
                <p className="text-slate-400">
                  Please try again or use another login method
                </p>
              </>
            )}
          </div>

          {status === 'recognized' && (
            <Button
              onClick={handleSuccess}
              className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
            >
              Continue
            </Button>
          )}

          {status === 'failed' && (
            <Button
              onClick={handleRetry}
              className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
            >
              Try Again
            </Button>
          )}

          {status === 'scanning' && (
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full border-slate-600 text-white hover:bg-slate-700"
            >
              Use Email Login
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
