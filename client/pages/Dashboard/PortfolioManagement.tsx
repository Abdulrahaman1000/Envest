import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Eye, TrendingUp, Users, BarChart3, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const BY_VOLUME = [
    { name: 'NGN Stocks', value: '₦350,000,000' },
    { name: 'US Stocks', value: '₦270,000,000' },
    { name: 'GoldenBridge Income Notes (GIN)', value: '₦180,000,000' },
    { name: 'GoldenBridge Ethical Notes (GEN)', value: '₦150,000,000' },
    { name: 'GoldenBridge Dollar Notes (GDN)', value: '₦80,000,000' },
    { name: 'GoldenBridge Treasury Notes (GTN)', value: '₦80,000,000' },
];

const BY_PERFORMANCE = [
    { name: 'US Stocks', roi: '18%' },
    { name: 'GoldenBridge Ethical Notes (GEN)', roi: '8%' },
    { name: 'NGN Stocks', roi: '15%' },
    { name: 'GoldenBridge Income Notes (GIN)', roi: '12%' },
    { name: 'GoldenBridge Dollar Notes (GDN)', roi: '8%' },
    { name: 'GoldenBridge Treasury Notes (GTN)', roi: '8%' },
];

const USERS = [
    { id: '1', userId: '78Ce78y366789', userName: 'Chia Nguevese', totalInvestments: 2, totalValue: '₦200,000,000.00', roiAvg: '10%', status: 'Matured' },
    { id: '2', userId: '10Ce78y366700', userName: 'Devon Lane', totalInvestments: 4, totalValue: '₦500,000,000.00', roiAvg: '10%', status: 'Active' },
    { id: '3', userId: '67897vr366222', userName: 'Theresa Webb', totalInvestments: 8, totalValue: '₦500,000,000.00', roiAvg: '10%', status: 'Matured' },
    { id: '4', userId: '78Ni78y366789', userName: 'Albert Flores', totalInvestments: 1, totalValue: '₦200,000.00', roiAvg: '10%', status: 'Active' },
    { id: '5', userId: '78Ce78y366789', userName: 'Ralph Edwards', totalInvestments: 9, totalValue: '₦100,000.00', roiAvg: '10%', status: 'Matured' },
    { id: '6', userId: '78Ce78y366789', userName: 'Marvin McKinney', totalInvestments: 5, totalValue: '₦200,000,000.00', roiAvg: '10%', status: 'Active' },
    { id: '7', userId: '10Fe94y388744', userName: 'Kristin Watson', totalInvestments: 2, totalValue: '₦200,000,000.00', roiAvg: '10%', status: 'Matured' },
    { id: '8', userId: '32VC78y533700', userName: 'Kathryn Murphy', totalInvestments: 4, totalValue: '₦200,000,000.00', roiAvg: '10%', status: 'Matured' },
    { id: '9', userId: '78Ce78y366789', userName: 'Darlene Robertson', totalInvestments: 8, totalValue: '₦200,000,000.00', roiAvg: '10%', status: 'Active' },
    { id: '10', userId: '78Ce78y366789', userName: 'Arlene McCoy', totalInvestments: 12, totalValue: '₦200,000,000.00', roiAvg: '10%', status: 'Matured' },
];

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) {
    return (
        <div className={cn("bg-white rounded-2xl p-5 border flex-1 shadow-sm", accent ? "border-yellow-200" : "border-slate-100")}>
            <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-slate-500">{label}</p>
                <div className={cn("p-2 rounded-xl", accent ? "bg-yellow-50" : "bg-slate-50")}>
                    <Icon size={14} className={accent ? "text-yellow-600" : "text-slate-400"} />
                </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    );
}

export default function PortfolioManagement() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const TOTAL_PAGES = 30;

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold text-slate-900">Portfolio management</h1>

            {/* Stats */}
            <div className="flex gap-4">
                <StatCard icon={TrendingUp} label="Total portfolio value" value="₦254,240,000.00" accent />
                <StatCard icon={Users} label="Number of active portfolios" value="200" />
                <StatCard icon={BarChart3} label="Total returns generated" value="₦ 24,240.00" />
                <StatCard icon={Clock} label="Portfolios pending action" value="20" />
            </div>

            {/* Two Tables Row */}
            <div className="grid grid-cols-2 gap-5">
                {/* By Volume */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-50">
                        <h2 className="text-sm font-bold text-slate-800">Investment products by Volume</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Investment products</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">By Volume</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {BY_VOLUME.map((row) => (
                                <tr key={row.name} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-5 py-3.5 text-sm text-slate-600">{row.name}</td>
                                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800 text-right">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* By Performance */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-50">
                        <h2 className="text-sm font-bold text-slate-800">Investment products by Performance</h2>
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-50">
                                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Investment products</th>
                                <th className="px-5 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Average ROI</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {BY_PERFORMANCE.map((row) => (
                                <tr key={row.name} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-5 py-3.5 text-sm text-slate-600">{row.name}</td>
                                    <td className="px-5 py-3.5 text-sm font-semibold text-slate-800 text-right">{row.roi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Portfolio List */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h2 className="text-base font-bold text-slate-800">User Portfolio List</h2>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                        <Filter size={14} />
                        Filter
                    </button>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-50">
                            {['S/N', 'User ID', 'User Name', 'Total investments', 'Total value', 'ROI Avg', 'Status', 'Action'].map(col => (
                                <th key={col} className="px-4 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {USERS.map((user, i) => (
                            <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                                <td className="px-4 py-4 text-sm text-slate-400">{i + 1}</td>
                                <td className="px-4 py-4 text-sm font-mono text-slate-600">{user.userId}</td>
                                <td className="px-4 py-4 text-sm font-semibold text-slate-800">{user.userName}</td>
                                <td className="px-4 py-4 text-sm text-slate-600">{user.totalInvestments}</td>
                                <td className="px-4 py-4 text-sm font-semibold text-slate-800">{user.totalValue}</td>
                                <td className="px-4 py-4 text-sm text-slate-600">{user.roiAvg}</td>
                                <td className="px-4 py-4">
                                    <span className={cn("text-sm font-semibold",
                                        user.status === 'Active' ? "text-emerald-500" : "text-orange-500"
                                    )}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => navigate(`/dashboard/portfolio/${user.id}`)}
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
                        {[1, 2, 3, '...', 10, 11, 12].map((p, i) => (
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