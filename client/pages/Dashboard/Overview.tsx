import { StatCards } from './blocks/StatCards';
import { RegistrationChart } from './blocks/RegistrationChart';
import { TransactionHistory } from './blocks/TransactionHistory';
import { RecentKYC } from '@/pages/Dashboard/blocks/RecentKYC';

export default function Overview() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900">Overview</h1>
            </div>

            <StatCards />

            <div className="grid grid-cols-3 gap-8">
                <RegistrationChart />
                <TransactionHistory />
            </div>

            <RecentKYC />
        </div>
    );
}
