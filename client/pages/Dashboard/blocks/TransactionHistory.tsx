import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ChevronRight } from 'lucide-react';
import mockData from '@/lib/api/mockData.json';
import { cn } from '@/lib/utils';

export function TransactionHistory() {
    return (
        <Card className="p-8 border-slate-100 shadow-sm rounded-3xl bg-white flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Transaction History</h3>
                <button className="text-[#B8860B] text-sm font-bold flex items-center gap-1 hover:underline">
                    View all <ChevronRight size={16} />
                </button>
            </div>

            <div className="space-y-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Yesterday</div>

                {mockData.transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                tx.amount < 0 ? "bg-red-50 text-red-500" : "bg-green-50 text-green-500"
                            )}>
                                {tx.amount < 0 ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-slate-900 text-sm">from {tx.from}</span>
                                <span className="text-xs text-slate-500">{tx.type}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className={cn(
                                "font-bold text-sm",
                                tx.amount < 0 ? "text-slate-900" : "text-slate-900"
                            )}>
                                {tx.amount < 0 ? '-' : '+'}{Math.abs(tx.amount).toFixed(2)} {tx.currency}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
