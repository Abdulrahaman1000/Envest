import { DataTable } from '@/components/ui/DataTable';
import mockData from '@/lib/api/mockData.json';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function RecentKYC() {
    const navigate = useNavigate();
    // Show only first 5 for overview
    const data = (mockData.kyc_requests || []).slice(0, 5);

    const columns = [
        { header: 'S/N', cell: (item: any) => mockData.kyc_requests.indexOf(item) + 1, className: "pl-6 whitespace-nowrap w-20" },
        { header: 'ID', accessorKey: 'id' as const },
        { header: 'Name', accessorKey: 'name' as const },
        { header: 'Email address', accessorKey: 'email' as const },
        { header: 'Progress', accessorKey: 'progress' as const },
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
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">KYC Management</h3>
                <button
                    onClick={() => navigate('/dashboard/kyc')}
                    className="text-[#B8860B] text-sm font-bold flex items-center gap-1 hover:underline"
                >
                    View all <ChevronRight size={16} />
                </button>
            </div>

            <DataTable
                data={data}
                columns={columns}
            />
        </div>
    );
}
