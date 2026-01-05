import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useOnboardingStore } from '@/stores/onboardingStore';

export default function Onboarding() {
  const navigate = useNavigate();
  const { nextStep } = useOnboardingStore();

  const slides = [
    {
      id: 1,
      title: 'Invest smarter, not harder',
      description: 'Grow your wealth with our intelligent investment platform',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop',
    },
    {
      id: 2,
      title: 'Easy account setup',
      description: 'Create your account in minutes with our simple process',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop',
    },
    {
      id: 3,
      title: 'Secure & trusted',
      description: 'Your investments are protected with bank-level security',
      image: 'https://images.unsplash.com/photo-1460925895917-aae19e938282?w=400&h=600&fit=crop',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-6">
        {slides.map((slide) => (
          <Card key={slide.id} className="hidden border-0 bg-slate-800">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
              <p className="text-slate-300">{slide.description}</p>
            </div>
          </Card>
        ))}

        <Card className="border-0 bg-slate-800 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Invest smarter, not harder
              </h2>
              <p className="mt-2 text-slate-400">
                Grow your wealth with our intelligent investment platform
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => navigate('/create-account')}
                className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
                size="lg"
              >
                Create Account
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="w-full border-slate-600 text-white hover:bg-slate-700"
                size="lg"
              >
                Login
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <div className="h-2 w-2 rounded-full bg-slate-600" />
              <div className="h-2 w-2 rounded-full bg-slate-600" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
