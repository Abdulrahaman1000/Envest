import { X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FilterProps {
    onApply: (filters: any) => void;
    onClear: () => void;
}

export function Filter({ onApply, onClear }: FilterProps) {
    const [status, setStatus] = useState<string>('');
    const [dateRange, setDateRange] = useState<string>('');
    const [searchId, setSearchId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    const handleApply = () => {
        onApply({ status, dateRange, searchId });
        setIsOpen(false);
    };

    const handleClear = () => {
        setStatus('');
        setDateRange('');
        setSearchId('');
        onClear();
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 text-slate-500 font-medium border-slate-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-6 rounded-2xl" align="end">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Filter</h3>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-base font-medium text-slate-900">By Status</label>
                        <div className="flex flex-wrap gap-3">
                            {['All', 'Pending', 'Approved', 'Declined'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s === 'All' ? '' : s)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium border transition-colors",
                                        (status === s) || (s === 'All' && !status)
                                            ? "bg-[#B8860B] text-white border-[#B8860B]"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-[#B8860B]"
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-base font-medium text-slate-900">By Date</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Select date range"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full h-12 pl-4 pr-10 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-base font-medium text-slate-900">By ID</label>
                        <input
                            type="text"
                            placeholder="search ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <button
                            onClick={handleClear}
                            className="px-6 py-2.5 rounded-xl text-slate-900 font-semibold border border-slate-900 hover:bg-slate-50 transition-colors"
                        >
                            Clear filter
                        </button>
                        <button
                            onClick={handleApply}
                            className="px-6 py-2.5 rounded-xl text-white font-semibold bg-[#B8860B] hover:bg-[#966F09] transition-colors"
                        >
                            Apply filter
                        </button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
