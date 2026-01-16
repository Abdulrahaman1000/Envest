import { Card } from '@/components/ui/card';
import mockData from '@/lib/api/mockData.json';

const stats = [
    { label: 'Total users', value: mockData.total_users, className: 'bg-[#0A0E1A] text-white' },
    { label: 'Pending KYC', value: mockData.kyc_pending },
    { label: 'Available investment products', value: mockData.investment_products_count },
    { label: 'Recent transactions', value: mockData.recent_transactions_count },
];

export function StatCards() {
    return (
        <div className="grid grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card
                    key={stat.label}
                    className={`p-6 border-slate-100 shadow-sm rounded-2xl flex flex-col justify-between h-32 ${stat.className || 'bg-white text-slate-900'}`}
                >
                    <span className="text-sm font-medium opacity-70">{stat.label}</span>
                    <span className="text-4xl font-bold">{stat.value}</span>
                </Card>
            ))}
        </div>
    );
}
