import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOnboardingStore } from '@/stores/onboardingStore';

export default function KYC() {
  const navigate = useNavigate();
  const { accountData, updateAccountData } = useOnboardingStore();
  const [currentStep, setCurrentStep] = useState<
    'verification' | 'bank' | 'success'
  >('verification');

  const countries = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'Uganda',
  ];

  const idTypes = ['National ID', 'Passport', 'Driver License'];
  const banks = [
    'First Bank',
    'Zenith Bank',
    'Access Bank',
    'GT Bank',
    'UBA',
  ];

  const handleNext = () => {
    if (currentStep === 'verification') {
      setCurrentStep('bank');
    } else if (currentStep === 'bank') {
      setCurrentStep('success');
    } else {
      navigate('/home');
    }
  };

  const handleChange = (field: string, value: string) => {
    updateAccountData({ [field]: value });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 px-4 py-8">
      <div className="w-full max-w-sm space-y-4 mx-auto">
        {currentStep === 'verification' && (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                KYC verification
              </h1>
              <p className="text-sm text-slate-400">
                Please provide your details for verification
              </p>
            </div>

            <Card className="border-0 bg-slate-800 p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  Country of origin
                </label>
                <Select
                  value={accountData.countryOfOrigin || ''}
                  onValueChange={(value) => handleChange('countryOfOrigin', value)}
                >
                  <SelectTrigger className="border-slate-600 bg-slate-700 text-white">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-600 bg-slate-800 text-white">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  ID Type
                </label>
                <Select
                  value={accountData.idType || ''}
                  onValueChange={(value) => handleChange('idType', value)}
                >
                  <SelectTrigger className="border-slate-600 bg-slate-700 text-white">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-600 bg-slate-800 text-white">
                    {idTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  ID Number
                </label>
                <Input
                  placeholder="Enter your ID number"
                  value={accountData.idNumber || ''}
                  onChange={(e) => handleChange('idNumber', e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  BVN (if applicable)
                </label>
                <Input
                  placeholder="Your BVN"
                  value={accountData.bvn || ''}
                  onChange={(e) => handleChange('bvn', e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
              >
                Continue
              </Button>
            </Card>
          </>
        )}

        {currentStep === 'bank' && (
          <>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Bank details</h1>
              <p className="text-sm text-slate-400">
                Add your bank information
              </p>
            </div>

            <Card className="border-0 bg-slate-800 p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  Bank Name
                </label>
                <Select
                  value={accountData.bankName || ''}
                  onValueChange={(value) => handleChange('bankName', value)}
                >
                  <SelectTrigger className="border-slate-600 bg-slate-700 text-white">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-600 bg-slate-800 text-white">
                    {banks.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-300">
                  Account Number
                </label>
                <Input
                  placeholder="0123456789"
                  value={accountData.accountNumber || ''}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  className="border-slate-600 bg-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
              >
                Continue
              </Button>
            </Card>
          </>
        )}

        {currentStep === 'success' && (
          <Card className="border-0 bg-slate-800 p-6 flex flex-col items-center justify-center space-y-6 min-h-96">
            <div className="text-5xl">✓</div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">You're all set!</h2>
              <p className="text-slate-400">
                Your account has been successfully created
              </p>
            </div>
            <Button
              onClick={handleNext}
              className="w-full bg-yellow-400 text-slate-900 hover:bg-yellow-500"
            >
              Go to Home
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
