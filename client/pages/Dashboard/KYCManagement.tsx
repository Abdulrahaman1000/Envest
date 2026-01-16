import { useState, useMemo } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Pagination } from '@/components/ui/pagination';
import { Filter } from '@/components/ui/Filter';
import { ChevronRight } from 'lucide-react';
import mockData from '@/lib/api/mockData.json';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

export default function KYCManagement() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('All');
    const [filters, setFilters] = useState({ status: '', dateRange: '', searchId: '' });

    // Filter Data
    const filteredData = useMemo(() => {
        let data = mockData.kyc_requests || [];

        // Tab Filter
        if (activeTab !== 'All') {
            data = data.filter(item => item.status === activeTab);
        }

        // Advanced Filter
        if (filters.status) {
            data = data.filter(item => item.status === filters.status);
        }
        if (filters.searchId) {
            data = data.filter(item => item.id.includes(filters.searchId));
        }
        // Date filter logic would go here

        return data;
    }, [activeTab, filters]);

    // Pagination
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const currentData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const columns = [
        { header: 'S/N', cell: (item: any) => filteredData.indexOf(item) + 1, className: "pl-6 whitespace-nowrap" },
        { header: 'ID', accessorKey: 'id' as const, className: "whitespace-nowrap" },
        { header: 'Name', accessorKey: 'name' as const, className: "whitespace-nowrap" },
        { header: 'Email address', accessorKey: 'email' as const, className: "whitespace-nowrap" },
        { header: 'Progress', accessorKey: 'progress' as const, className: "whitespace-nowrap" },
        {
            header: 'Status',
            cell: (item: any) => (
                <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    item.status === 'Approved' ? "bg-green-50 text-green-500" :
                        item.status === 'Pending' ? "bg-blue-50 text-blue-500" :
                            "bg-red-50 text-red-500"
                )}>
                    {item.status}
                </span>
            )
        },
        { header: 'Last updated', accessorKey: 'last_updated' as const },
        {
            header: 'Action',
            cell: () => (
                <button className="w-8 h-8 rounded-full border border-[#B8860B] flex items-center justify-center text-[#B8860B] hover:bg-[#B8860B] hover:text-white transition-colors">
                    <div className="w-2 h-2 rounded-full border-2 border-current"></div>
                </button>
            ),
            className: "pr-6"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span onClick={() => navigate('/dashboard')} className="cursor-pointer hover:text-slate-900">Dashboard</span>
                    <ChevronRight size={14} />
                    <span className="font-semibold text-slate-900">KYC Management</span>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-8 border-b border-slate-100 w-full relative">
                        {['All', 'Pending', 'Approved', 'Declined'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-4 text-sm font-medium relative transition-colors",
                                    activeTab === tab ? "text-[#B8860B]" : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {tab}
                                <span className={cn(
                                    "ml-2 px-2 py-0.5 rounded-full text-xs",
                                    activeTab === tab ? "bg-[#B8860B]/10 text-[#B8860B]" : "bg-slate-100 text-slate-500"
                                )}>
                                    {/* Mock counts */}
                                    {tab === 'All' ? 1500 : tab === 'Pending' ? 10 : tab === 'Approved' ? 20 : 1}
                                </span>
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B8860B]"></span>
                                )}
                            </button>
                        ))}

                        <div className="absolute right-0 top-0 -mt-2">
                            <Filter onApply={setFilters} onClear={() => setFilters({ status: '', dateRange: '', searchId: '' })} />
                        </div>
                    </div>
                </div>

                <DataTable
                    data={currentData}
                    columns={columns}
                />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="mt-6"
                />
            </div>
        </div>
    );
}
