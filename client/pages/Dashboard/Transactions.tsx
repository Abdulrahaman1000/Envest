import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Eye, TrendingUp, TrendingDown, ArrowLeftRight, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

type TransactionType = 'Deposit' | 'Withdrawal' | 'Refund' | 'Charge back';
type TransactionStatus = 'Pending' | 'Approved' | 'Failed' | 'Reversed';

interface Transaction {
    id: string;
    sn: number;
    transactionId: string;
    userName: string;
    channel: string;
    type: TransactionType;
    amount: string;
    status: TransactionStatus;
    dateRequest: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', sn: 1, transactionId: '0000000001', userName: 'Chia Nguevese', channel: 'Bank transfer', type: 'Deposit', amount: '₦25,000,000', status: 'Pending', dateRequest: '17 May 2025' },
    { id: '2', sn: 2, transactionId: '0000000002', userName: 'Arlene McCoy', channel: 'Card payment', type: 'Withdrawal', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '3', sn: 3, transactionId: '0000000003', userName: 'Bessie Cooper', channel: 'Wallet', type: 'Deposit', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '4', sn: 4, transactionId: '0000000004', userName: 'Marvin McKinney', channel: 'Wallet', type: 'Refund', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '5', sn: 5, transactionId: '0000000005', userName: 'Albert Flores', channel: 'Bank transfer', type: 'Charge back', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '6', sn: 6, transactionId: '0000000006', userName: 'Jane Cooper', channel: 'Bank transfer', type: 'Deposit', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '7', sn: 7, transactionId: '0000000007', userName: 'Kathryn Murphy', channel: 'Bank transfer', type: 'Deposit', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '8', sn: 8, transactionId: '0000000008', userName: 'Jerome Bell', channel: 'Bank transfer', type: 'Withdrawal', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '9', sn: 9, transactionId: '0000000009', userName: 'Devon Lane', channel: 'Bank transfer', type: 'Deposit', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
    { id: '10', sn: 10, transactionId: '0000000010', userName: 'Guy Hawkins', channel: 'Bank transfer', type: 'Withdrawal', amount: '₦25,000,000', status: 'Approved', dateRequest: '17 May 2025' },
];

const CHART_DATA = [
    { month: 'Jan', value: 110000 },
    { month: 'Feb', value: 105000 },
    { month: 'Mar', value: 95000 },
    { month: 'Apr', value: 75000 },
    { month: 'May', value: 80000 },
    { month: 'Jun', value: 70000 },
    { month: 'Jul', value: 120000 },
    { month: 'Aug', value: 85000 },
    { month: 'Sep', value: 100000 },
    { month: 'Oct', value: 130000 },
    { month: 'Nov', value: 145000 },
    { month: 'Dec', value: 160000 },
];

const TYPE_STYLES: Record<TransactionType, string> = {
    'Deposit': 'text-emerald-500',
    'Withdrawal': 'text-red-500',
    'Refund': 'text-blue-500',
    'Charge back': 'text-yellow-600',
};

const STATUS_STYLES: Record<TransactionStatus, string> = {
    'Pending': 'bg-slate-100 text-slate-600 border border-slate-200',
    'Approved': 'text-emerald-500',
    'Failed': 'text-red-500',
    'Reversed': 'text-orange-500',
};

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) {
    return (
        <div className={cn(
            "bg-white rounded-2xl p-5 border flex-1",
            accent ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-white" : "border-slate-100"
        )}>
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-slate-500 font-medium">{label}</p>
                <div className={cn("p-2 rounded-xl", accent ? "bg-yellow-100" : "bg-slate-100")}>
                    <Icon size={14} className={accent ? "text-yellow-600" : "text-slate-500"} />
                </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-lg">
                ₦{payload[0].value.toLocaleString()},000
            </div>
        );
    }
    return null;
};

export default function Transactions() {
    const navigate = useNavigate();
    const [timePeriod, setTimePeriod] = useState<'Monthly' | 'Yearly'>('Monthly');
    const [currentPage, setCurrentPage] = useState(1);
    const TOTAL_PAGES = 30;
    const pageNumbers = [1, 2, 3, '...', 10, 11, 12];

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="flex gap-4">
                <StatCard icon={TrendingUp} label="Inflow" value="₦120,000,000" accent />
                <StatCard icon={TrendingDown} label="Outflow" value="₦95,000,000" />
                <StatCard icon={ArrowLeftRight} label="Net Balance (Inflow – Outflow)" value="₦25,000,000" />
                <StatCard icon={BarChart3} label="Transactions Volume" value="4,320" />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-bold text-slate-800">Transaction Analytics</h2>
                    <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                        {(['Monthly', 'Yearly'] as const).map((p) => (
                            <button
                                key={p}
                                onClick={() => setTimePeriod(p)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                                    timePeriod === p ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-6">₦120,000,000</p>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={CHART_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `${v / 1000}k`} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#B8860B', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#B8860B"
                            strokeWidth={2.5}
                            dot={false}
                            activeDot={{ r: 6, fill: '#B8860B', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-800">Transactions</h2>
                    <button
                        onClick={() => navigate('/dashboard/transactions/filter')}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <Filter size={15} />
                        Filter
                    </button>
                </div>

                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-50">
                            {['S/N', 'Transaction ID', 'User Name', 'Channel', 'Transaction type', 'Amount', 'Status', 'Date request', 'Action'].map(col => (
                                <th key={col} className="px-4 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {MOCK_TRANSACTIONS.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="px-4 py-4 text-sm text-slate-400">{tx.sn}</td>
                                <td className="px-4 py-4 text-sm font-mono text-slate-600">{tx.transactionId}</td>
                                <td className="px-4 py-4 text-sm font-semibold text-slate-800">{tx.userName}</td>
                                <td className="px-4 py-4 text-sm text-slate-500">{tx.channel}</td>
                                <td className="px-4 py-4">
                                    <span className={cn("text-sm font-semibold", TYPE_STYLES[tx.type])}>{tx.type}</span>
                                </td>
                                <td className="px-4 py-4 text-sm font-semibold text-slate-800">{tx.amount}</td>
                                <td className="px-4 py-4">
                                    {tx.status === 'Pending' ? (
                                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", STATUS_STYLES[tx.status])}>
                                            {tx.status}
                                        </span>
                                    ) : (
                                        <span className={cn("text-sm font-semibold", STATUS_STYLES[tx.status])}>{tx.status}</span>
                                    )}
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-400">{tx.dateRequest}</td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => navigate(`/dashboard/transactions/${tx.transactionId}`)}
                                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                    <span className="text-sm text-slate-400">Page {currentPage} of {TOTAL_PAGES}</span>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        {pageNumbers.map((p, i) => (
                            <button key={i} onClick={() => typeof p === 'number' && setCurrentPage(p)}
                                className={cn("w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                                    p === currentPage ? "bg-[#B8860B] text-white"
                                        : p === '...' ? "text-slate-300 cursor-default"
                                            : "text-slate-500 hover:bg-slate-100"
                                )}>
                                {p}
                            </button>
                        ))}
                        <button onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))} disabled={currentPage === TOTAL_PAGES}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        Go to page
                        <input type="number" min={1} max={TOTAL_PAGES} defaultValue={currentPage}
                            onBlur={(e) => setCurrentPage(Math.min(TOTAL_PAGES, Math.max(1, Number(e.target.value))))}
                            className="w-14 text-center border border-slate-200 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}