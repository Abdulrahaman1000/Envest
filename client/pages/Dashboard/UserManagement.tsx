import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserStatus = 'Active' | 'Suspended' | 'Deactivated';

interface AdminUser {
    id: string;
    sn: number;
    name: string;
    email: string;
    phone: string;
    status: UserStatus;
    lastLogin: string;
}

const MOCK_USERS: AdminUser[] = [
    { id: '000001', sn: 1, name: 'Chia Cynthia', email: 'cynthiachia@gmil.com', phone: '07063044909', status: 'Active', lastLogin: 'Jan 1, 2025' },
    { id: '000002', sn: 2, name: 'Marvin McKinney', email: 'jackson.graham@example.com', phone: '(239) 555-0108', status: 'Suspended', lastLogin: 'Jan 1, 2025' },
    { id: '000003', sn: 3, name: 'Cody Fisher', email: 'bill.sanders@example.com', phone: '(225) 555-0118', status: 'Deactivated', lastLogin: 'Jan 1, 2025' },
    { id: '000004', sn: 4, name: 'Kathryn Murphy', email: 'alma.lawson@example.com', phone: '(207) 555-0119', status: 'Suspended', lastLogin: 'Jan 1, 2025' },
    { id: '000005', sn: 5, name: 'Robert Fox', email: 'tanya.hill@example.com', phone: '(229) 555-0109', status: 'Active', lastLogin: 'Jan 1, 2025' },
    { id: '000006', sn: 6, name: 'Brooklyn Simmons', email: 'michael.mitc@example.com', phone: '(629) 555-0129', status: 'Deactivated', lastLogin: 'Jan 1, 2025' },
    { id: '000007', sn: 7, name: 'Jenny Wilson', email: 'nathan.roberts@example.com', phone: '(406) 555-0120', status: 'Active', lastLogin: 'Jan 1, 2025' },
    { id: '000008', sn: 8, name: 'Courtney Henry', email: 'tim.jennings@example.com', phone: '(907) 555-0101', status: 'Active', lastLogin: 'Jan 1, 2025' },
    { id: '000009', sn: 9, name: 'Jane Cooper', email: 'curtis.weaver@example.com', phone: '(303) 555-0105', status: 'Active', lastLogin: 'Jan 1, 2025' },
    { id: '000010', sn: 10, name: 'Wade Warren', email: 'georgia.young@example.com', phone: '(671) 555-0110', status: 'Active', lastLogin: 'Jan 1, 2025' },
];

type ModalType = 'suspend' | 'unsuspend' | 'delete' | null;

interface ConfirmModalProps {
    type: ModalType;
    userName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmModal({ type, userName, onConfirm, onCancel }: ConfirmModalProps) {
    const config = {
        suspend: {
            title: 'Suspend user?',
            message: `Are you sure you want to suspend this user?`,
            confirmText: 'Yes, suspend',
        },
        unsuspend: {
            title: 'Un-suspend user',
            message: `Are you sure you want to un-suspend this user?`,
            confirmText: 'Yes, un-suspend',
        },
        delete: {
            title: 'Delete account',
            message: `Are you sure you want to delete this user?`,
            confirmText: 'Yes, delete',
        },
    };

    if (!type) return null;
    const { title, message, confirmText } = config[type];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mx-auto mb-4">
                    <span className="text-yellow-500 text-xl">⚠️</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{title}</h2>
                <p className="text-sm text-slate-500 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-2.5 bg-[#B8860B] text-white rounded-xl text-sm font-medium hover:bg-[#9a7009] transition-colors"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: UserStatus }) {
    return (
        <span className={cn(
            "text-xs font-semibold",
            status === 'Active' && "text-emerald-500",
            status === 'Suspended' && "text-yellow-600",
            status === 'Deactivated' && "text-red-500",
        )}>
            {status}
        </span>
    );
}

function ActionsDropdown({
    user,
    onAction,
}: {
    user: AdminUser;
    onAction: (action: 'view' | 'suspend' | 'unsuspend' | 'delete', user: AdminUser) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
                <MoreVertical size={16} />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className="absolute right-0 top-8 z-20 bg-white border border-slate-100 rounded-xl shadow-xl py-1 w-44 overflow-hidden">
                        {[
                            { label: 'View user', action: 'view' as const },
                            { label: 'Suspend user', action: 'suspend' as const },
                            { label: 'Un-suspend user', action: 'unsuspend' as const },
                            { label: 'Delete account', action: 'delete' as const, danger: true },
                        ].map(({ label, action, danger }) => (
                            <button
                                key={action}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpen(false);
                                    onAction(action, user);
                                }}
                                className={cn(
                                    "w-full text-left px-4 py-2.5 text-sm transition-colors",
                                    danger
                                        ? "text-red-500 hover:bg-red-50"
                                        : "text-slate-700 hover:bg-slate-50"
                                )}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function UserManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<AdminUser[]>(MOCK_USERS);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [modal, setModal] = useState<{ type: ModalType; user: AdminUser | null }>({ type: null, user: null });

    const TOTAL_USERS = 1500;
    const TOTAL_PAGES = 30;

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.includes(search)
    );

    const handleAction = (action: 'view' | 'suspend' | 'unsuspend' | 'delete', user: AdminUser) => {
        if (action === 'view') {
            navigate(`/dashboard/users/${user.id}`);
        } else {
            setModal({ type: action as ModalType, user });
        }
    };

    const handleConfirm = () => {
        if (!modal.user) return;
        const { type, user } = modal;

        setUsers(prev => prev.map(u => {
            if (u.id !== user.id) return u;
            if (type === 'suspend') return { ...u, status: 'Suspended' as UserStatus };
            if (type === 'unsuspend') return { ...u, status: 'Active' as UserStatus };
            return u;
        }).filter(u => type === 'delete' ? u.id !== user.id : true));

        setModal({ type: null, user: null });
    };

    const pageNumbers = [1, 2, 3, '...', 10, 11, 12];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-slate-900">All users</h1>
                    <span className="px-2.5 py-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-bold rounded-full">
                        {TOTAL_USERS.toLocaleString()}
                    </span>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    <Filter size={15} />
                    Filter
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-100">
                            {['S/N', 'Name', 'Email address', 'ID', 'Phone number', 'Status', 'Last login', ''].map((col) => (
                                <th key={col} className="px-5 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider first:w-12">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filtered.map((user) => (
                            <tr
                                key={user.id}
                                onClick={() => navigate(`/dashboard/users/${user.id}`)}
                                className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                            >
                                <td className="px-5 py-4 text-sm text-slate-400">{user.sn}</td>
                                <td className="px-5 py-4 text-sm font-semibold text-slate-900">{user.name}</td>
                                <td className="px-5 py-4 text-sm text-slate-500">{user.email}</td>
                                <td className="px-5 py-4 text-sm text-slate-500 font-mono">{user.id}</td>
                                <td className="px-5 py-4 text-sm text-slate-500">{user.phone}</td>
                                <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                                <td className="px-5 py-4 text-sm text-slate-400">{user.lastLogin}</td>
                                <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                                    <ActionsDropdown user={user} onAction={handleAction} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
                    <span className="text-sm text-slate-400">Page {currentPage} of {TOTAL_PAGES}</span>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        {pageNumbers.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => typeof p === 'number' && setCurrentPage(p)}
                                className={cn(
                                    "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                                    p === currentPage
                                        ? "bg-[#B8860B] text-white"
                                        : p === '...'
                                            ? "text-slate-300 cursor-default"
                                            : "text-slate-500 hover:bg-slate-100"
                                )}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(TOTAL_PAGES, p + 1))}
                            disabled={currentPage === TOTAL_PAGES}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        Go to page
                        <input
                            type="number"
                            min={1}
                            max={TOTAL_PAGES}
                            defaultValue={currentPage}
                            onBlur={(e) => setCurrentPage(Math.min(TOTAL_PAGES, Math.max(1, Number(e.target.value))))}
                            className="w-14 text-center border border-slate-200 rounded-lg py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                    </div>
                </div>
            </div>

            {/* Confirm Modal */}
            {modal.type && modal.user && (
                <ConfirmModal
                    type={modal.type}
                    userName={modal.user.name}
                    onConfirm={handleConfirm}
                    onCancel={() => setModal({ type: null, user: null })}
                />
            )}
        </div>
    );
}