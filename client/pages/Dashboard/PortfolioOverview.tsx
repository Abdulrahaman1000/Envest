import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_USER = {
    id: '1',
    name: 'Chia Cynthia Nguevese',
    userId: '78Ce78y366789',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
    status: 'Active',
    email: 'cynthianguevese@gmail.com',
    phone: '0706304490',
    kycStatus: 'Completed',
    portfolioValue: '₦126,997.00',
    totalInvested: '₦100,000.00',
    totalROI: '₦26,997.00',
    activeInvestments: 6,
};

const TRANSACTIONS = [
    { date: 'Yesterday', items: [
        { id: 'tx1', type: 'Deposit', datetime: '05 Feb 2025, 11:00 AM', amount: '-₦0.00', status: 'Successful', isCredit: true },
        { id: 'tx2', type: 'Cash withdrawal', datetime: '05 Feb 2025, 11:00 AM', amount: '-₦0.00', status: 'Failed', isCredit: false },
    ]},
    { date: '25-Jul-2025', items: [
        { id: 'tx3', type: 'Cash withdrawal', datetime: '05 Feb 2025, 11:00 AM', amount: '-₦0.00', status: 'Failed', isCredit: false },
    ]},
];

const INVESTMENTS = [
    { sn: 1, product: 'NGN Stock', amountInvested: '₦200,000', currentValue: '₦220,000', roi: '10%', startDate: '01 Jan 2025', maturityDate: 'Nil', status: 'Active', id: 'ngn-stock' },
    { sn: 2, product: 'GoldenBridge Treasury Notes (GTN) bill', amountInvested: '₦200,000', currentValue: '₦220,000', roi: '10%', startDate: '01 Jan 2025', maturityDate: '01 Jan 2026', status: 'Active', id: 'gtn-bill' },
    { sn: 3, product: 'GoldenBridge Income Notes (GIN)', amountInvested: '₦200,000', currentValue: '₦220,000', roi: '10%', startDate: '01 Jan 2025', maturityDate: '01 Jan 2026', status: 'Matured', id: 'gin' },
    { sn: 4, product: 'GoldenBridge Ethical Notes (GEN)', amountInvested: '₦200,000', currentValue: '₦220,000', roi: '10%', startDate: '01 Jan 2025', maturityDate: '01 Jan 2026', status: 'Active', id: 'gen' },
    { sn: 5, product: 'GoldenBridge Dollar Notes (GDN)', amountInvested: '₦200,000', currentValue: '₦220,000', roi: '10%', startDate: '01 Jan 2025', maturityDate: '01 Jan 2026', status: 'Matured', id: 'gdn' },
    { sn: 6, product: 'GoldenBridge Treasury Notes (GTN)', amountInvested: '₦200,000', currentValue: '₦220,000', roi: '10%', startDate: '01 Jan 2025', maturityDate: '01 Jan 2026', status: 'Matured', id: 'gtn' },
];

export default function PortfolioOverview() {
    const navigate = useNavigate();
    const { userId } = useParams();

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <button onClick={() => navigate('/dashboard/portfolio')}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors font-medium">
                    <ArrowLeft size={16} />
                    Back
                </button>
                <span className="text-slate-300">|</span>
                <button onClick={() => navigate('/dashboard/portfolio')} className="text-slate-400 hover:text-slate-600">
                    Portfolio management
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-semibold">Chia Cynthia</span>
            </div>

            {/* Header Row */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">Portfolio Overview</h1>
                <button className="px-5 py-2.5 bg-[#B8860B] text-white rounded-xl text-sm font-semibold hover:bg-[#9a7009] transition-colors">
                    Actions
                </button>
            </div>

            {/* Dark Stats Banner */}
            <div className="bg-[#0A0E1A] rounded-2xl px-6 py-5 grid grid-cols-4 gap-4">
                {[
                    { label: 'Portfolio value', value: MOCK_USER.portfolioValue },
                    { label: 'Total invested amount', value: MOCK_USER.totalInvested },
                    { label: 'Total ROI earned', value: MOCK_USER.totalROI },
                    { label: 'Active investments', value: String(MOCK_USER.activeInvestments) },
                ].map(({ label, value }) => (
                    <div key={label}>
                        <p className="text-xs text-slate-400 mb-1">{label}</p>
                        <p className="text-xl font-bold text-white">{value}</p>
                    </div>
                ))}
            </div>

            {/* User Card + Transactions Row */}
            <div className="grid grid-cols-2 gap-5">
                {/* User Card */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={MOCK_USER.avatar} alt={MOCK_USER.name}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-100" />
                        <div>
                            <h2 className="text-base font-bold text-slate-900">{MOCK_USER.name}</h2>
                            <p className="text-sm text-slate-400">{MOCK_USER.userId}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500">Status</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-500">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                                {MOCK_USER.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500">ID</span>
                            <span className="text-sm font-medium text-slate-700">{MOCK_USER.email}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500">Phone Number</span>
                            <span className="text-sm font-medium text-slate-700">{MOCK_USER.phone}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500">KYC status</span>
                            <span className="text-sm font-semibold text-emerald-500">{MOCK_USER.kycStatus}</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-slate-500">Phone Number</span>
                            <span className="text-sm font-medium text-slate-700">{MOCK_USER.phone}</span>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <h2 className="text-sm font-bold text-slate-800 mb-4">All transaction history</h2>
                    <div className="space-y-4">
                        {TRANSACTIONS.map((group) => (
                            <div key={group.date}>
                                <p className="text-xs text-slate-400 mb-2">{group.date}</p>
                                <div className="space-y-2">
                                    {group.items.map((tx) => (
                                        <button
                                            key={tx.id}
                                            onClick={() => navigate(`/dashboard/portfolio/transaction/${tx.id}`)}
                                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <div className={cn(
                                                "w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                                                tx.isCredit ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"
                                            )}>
                                                {tx.isCredit ? '+' : '-'}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-slate-800">{tx.type}</p>
                                                <p className="text-xs text-slate-400">{tx.datetime}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-slate-800">{tx.amount}</p>
                                                <p className={cn("text-xs font-medium",
                                                    tx.status === 'Successful' ? "text-emerald-500" : "text-red-500"
                                                )}>
                                                    {tx.status}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Investment Breakdown Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-800">Investment Breakdown</h2>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-50">
                            {['S/N', 'Product name', 'Amount invested', 'Current value', 'ROI', 'Start date', 'Maturity date', 'Status', 'Action'].map(col => (
                                <th key={col} className="px-4 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {INVESTMENTS.map((inv) => (
                            <tr key={inv.sn} className="hover:bg-slate-50/60 transition-colors">
                                <td className="px-4 py-4 text-sm text-slate-400">{inv.sn}</td>
                                <td className="px-4 py-4 text-sm font-medium text-slate-800">{inv.product}</td>
                                <td className="px-4 py-4 text-sm text-slate-600">{inv.amountInvested}</td>
                                <td className="px-4 py-4 text-sm text-slate-600">{inv.currentValue}</td>
                                <td className="px-4 py-4 text-sm text-slate-600">{inv.roi}</td>
                                <td className="px-4 py-4 text-sm text-slate-400">{inv.startDate}</td>
                                <td className="px-4 py-4 text-sm text-slate-400">{inv.maturityDate}</td>
                                <td className="px-4 py-4">
                                    <span className={cn("text-sm font-semibold",
                                        inv.status === 'Active' ? "text-emerald-500" : "text-orange-500"
                                    )}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => navigate(`/dashboard/portfolio/${userId}/investment/${inv.id}`)}
                                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}