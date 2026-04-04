import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export interface KycFilterValues {
    status: string;
    start_date: string;
    end_date: string;
    id: string;
}

interface KycFilterProps {
    onApply: (filters: KycFilterValues) => void;
    onClear: () => void;
    initialValues?: Partial<KycFilterValues>;
}

const STATUS_OPTIONS = ['All', 'Pending', 'Approved', 'Declined'] as const;

export function KycFilter({ onApply, onClear, initialValues }: KycFilterProps) {
    const [status, setStatus] = useState<string>(initialValues?.status || '');
    const [startDate, setStartDate] = useState<string>(initialValues?.start_date || '');
    const [endDate, setEndDate] = useState<string>(initialValues?.end_date || '');
    const [id, setId] = useState<string>(initialValues?.id || '');
    const [isOpen, setIsOpen] = useState(false);

    const handleApply = () => {
        onApply({ status, start_date: startDate, end_date: endDate, id });
        setIsOpen(false);
    };

    const handleClear = () => {
        setStatus('');
        setStartDate('');
        setEndDate('');
        setId('');
        onClear();
        setIsOpen(false);
    };

    const hasActiveFilters = status || startDate || endDate || id;

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        'gap-2 font-medium border-slate-200',
                        hasActiveFilters
                            ? 'text-[#B8860B] border-[#B8860B]'
                            : 'text-slate-500'
                    )}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filter
                    {hasActiveFilters && (
                        <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[400px] p-6 rounded-2xl shadow-xl" align="end">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Filter</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* By Status */}
                    <div className="space-y-3">
                        <label className="text-base font-medium text-slate-900">
                            By Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map(s => (
                                <button
                                    key={s}
                                    onClick={() => setStatus(s === 'All' ? '' : s)}
                                    className={cn(
                                        'px-4 py-2 rounded-lg text-sm font-medium border transition-colors',
                                        (s === 'All' && !status) || status === s
                                            ? 'bg-[#B8860B] text-white border-[#B8860B]'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-[#B8860B]'
                                    )}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* By Date */}
                    <div className="space-y-3">
                        <label className="text-base font-medium text-slate-900">
                            By Date
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="date"
                                placeholder="Start date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                            />
                            <input
                                type="date"
                                placeholder="End date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                            />
                        </div>
                    </div>

                    {/* By ID */}
                    <div className="space-y-3">
                        <label className="text-base font-medium text-slate-900">
                            By ID
                        </label>
                        <input
                            type="text"
                            placeholder="Search ID"
                            value={id}
                            onChange={e => setId(e.target.value)}
                            className="w-full h-12 px-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#B8860B]"
                        />
                    </div>

                    {/* Actions */}
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