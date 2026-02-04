import { useState, useMemo } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { Pagination } from '@/components/ui/pagination';
import { Filter, FilterValues } from '@/components/ui/Filter';
import { ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useKycList } from '@/hooks/useDashboard';

const ITEMS_PER_PAGE = 10;

// Transform API data to match DataTable requirements
interface KycTableRow {
    id: string;
    ID: string;
    NAME: string;
    email: string;
    progress: string;
    status: string;
    lastupdated: string;
}

export default function KYCManagement() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('All');
    const [filters, setFilters] = useState<FilterValues>({
        status: '',
        email: '',
        start_date: '',
        end_date: ''
    });

    // Build API payload based on current state
    const apiPayload = useMemo(() => {
        // Map tab selection to API status value
        let statusFilter = '';
        if (activeTab !== 'All') {
            statusFilter = activeTab;
        }
        // Filter status overrides tab if set
        if (filters.status) {
            statusFilter = filters.status;
        }

        return {
            email: filters.email || '',
            status: statusFilter,
            limit: ITEMS_PER_PAGE,
            page: currentPage,
            start_date: filters.start_date || '2020-01-01',
            end_date: filters.end_date || '2030-12-31'
        };
    }, [activeTab, filters, currentPage]);

    const { data: response, isLoading, isError } = useKycList(apiPayload);

    // Transform data to add lowercase 'id' for DataTable
    const users: KycTableRow[] = (response?.data?.users || []).map(user => ({
        ...user,
        id: user.ID
    }));

    const pagination = response?.data?.pagination;
    const totalPages = pagination?.last_page || 1;
    const totalItems = pagination?.total || 0;

    // Calculate counts for tabs (we'll show total for "All" and filter-based for others)
    const tabCounts = useMemo(() => {
        // Since we're using server-side filtering, we can't easily count each status
        // We'll show the current result count or use the pagination total
        return {
            'All': totalItems,
            'Level 1': activeTab === 'Level 1' ? users.length : '-',
            'Level 2': activeTab === 'Level 2' ? users.length : '-',
            'Level 3': activeTab === 'Level 3' ? users.length : '-',
            'Fully Verified': activeTab === 'Fully Verified' ? users.length : '-'
        };
    }, [totalItems, activeTab, users.length]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getStatusColor = (status: string) => {
        if (status === 'Fully Verified') return "bg-green-50 text-green-500";
        if (status.includes('Level')) return "bg-blue-50 text-blue-500";
        return "bg-yellow-50 text-yellow-500";
    };

    const columns = [
        {
            header: 'S/N',
            cell: (item: KycTableRow) => users.indexOf(item) + 1 + ((currentPage - 1) * ITEMS_PER_PAGE),
            className: "pl-6 whitespace-nowrap"
        },
        { header: 'ID', accessorKey: 'ID' as const, className: "whitespace-nowrap" },
        { header: 'Name', accessorKey: 'NAME' as const, className: "whitespace-nowrap" },
        { header: 'Email address', accessorKey: 'email' as const, className: "whitespace-nowrap" },
        {
            header: 'Progress',
            cell: (item: KycTableRow) => `Step ${item.progress}`,
            className: "whitespace-nowrap"
        },
        {
            header: 'Status',
            cell: (item: KycTableRow) => (
                <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold",
                    getStatusColor(item.status)
                )}>
                    {item.status}
                </span>
            )
        },
        {
            header: 'Last updated',
            cell: (item: KycTableRow) => formatDate(item.lastupdated)
        },
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

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setCurrentPage(1); // Reset to page 1 when changing tabs
    };

    const handleFilterApply = (newFilters: FilterValues) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to page 1 when applying filters
    };

    const handleFilterClear = () => {
        setFilters({ status: '', email: '', start_date: '', end_date: '' });
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                        {['All', 'Level 1', 'Level 2', 'Level 3', 'Fully Verified'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
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
                                    {tabCounts[tab as keyof typeof tabCounts]}
                                </span>
                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B8860B]"></span>
                                )}
                            </button>
                        ))}

                        <div className="absolute right-0 top-0 -mt-2">
                            <Filter
                                onApply={handleFilterApply}
                                onClear={handleFilterClear}
                                initialValues={filters}
                            />
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                    </div>
                ) : isError ? (
                    <div className="text-center py-16 text-slate-500">Failed to load KYC data</div>
                ) : users.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">No KYC records found</div>
                ) : (
                    <>
                        <DataTable
                            data={users}
                            columns={columns}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className="mt-6"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

