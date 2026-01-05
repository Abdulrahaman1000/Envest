import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-400">EnVest</h1>
        <p className="mt-4 text-lg text-slate-200">Invest Smarter, Not Harder</p>
      </div>
    </div>
  );
}
