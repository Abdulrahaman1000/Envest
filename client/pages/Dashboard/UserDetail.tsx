import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Calendar, TrendingUp, TrendingDown, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserStatus = 'Active' | 'Suspended' | 'Deactivated';
type ModalType = 'suspend' | 'unsuspend' | 'delete' | null;
type TabType = 'applicant' | 'transactions' | 'investments';

const MOCK_USER = {
    id: '000001',
    name: 'Chia Cynthia Nguevese',
    firstName: 'Cynthia',
    lastName: 'Chia',
    phone: '07044809821',
    email: 'cynthianguevese@gmail.com',
    status: 'Active' as UserStatus,
    dateJoined: 'May 12, 2025',
    lastLogin: 'May 12, 2025',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face',
};

const MOCK_TRANSACTIONS = [
    { date: 'Yesterday', items: [
        { type: 'withdrawal', label: 'Cash withdrawal', sub: 'Withdrawal made', amount: '-₦0.00' },
        { type: 'credit', label: 'Transfer received', sub: 'Transfer from Chia Ngue...', amount: '+₦0.00' },
    ]},
    { date: '25-Jul-2025', items: [
        { type: 'credit', label: 'Interest earned', sub: 'Dangote stock', amount: '+₦0.00' },
    ]},
    { date: '11-Jul-2025', items: [
        { type: 'withdrawal', label: 'Cash withdrawal', sub: 'Withdrawal made', amount: '-₦0.00' },
    ]},
    { date: '16-May-2025', items: [
        { type: 'credit', label: 'Interest earned', sub: 'Dangote stock', amount: '+₦0.00' },
        { type: 'credit', label: 'Interest earned', sub: 'Dangote stock', amount: '+₦0.00' },
        { type: 'credit', label: 'Interest earned', sub: 'Dangote stock', amount: '+₦0.00' },
    ]},
];

const MOCK_INVESTMENTS = {
    totalPortfolio: '₦1.2M',
    activeInvestments: 5,
    totalReturns: '₦1.2M',
    pendingMaturities: 2,
    breakdown: [
        { sn: 1, product: 'GoldenBridge Income Notes (GIN)', invested: '₦200,000', current: '₦210,000', status: 'Active', maturity: '12 May 2025' },
        { sn: 2, product: 'NGN Stocks', invested: '₦500,000', current: '₦600,000', status: 'Active', maturity: 'Ongoing' },
        { sn: 3, product: 'US Stocks', invested: '₦300,000', current: '₦330,000', status: 'Active', maturity: 'Ongoing' },
        { sn: 4, product: 'GoldenBridge Ethical Notes (GEN)', invested: '₦100,000', current: '₦120,000', status: 'Active', maturity: '12 May 2025' },
        { sn: 5, product: 'GoldenBridge Treasury Notes (GTN)', invested: '₦100,000', current: '₦140,000', status: 'Active', maturity: '12 May 2025' },
    ],
};

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
            >
                <span className="text-sm font-semibold text-slate-800">{title}</span>
                {open ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
            </button>
            {open && <div className="px-5 pb-5 pt-1 border-t border-slate-100">{children}</div>}
        </div>
    );
}

function InfoGrid({ items }: { items: { label: string; value: string }[] }) {
    return (
        <div className="grid grid-cols-2 gap-4 pt-2">
            {items.map(({ label, value }) => (
                <div key={label}>
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-slate-900">{value}</p>
                </div>
            ))}
        </div>
    );
}

function ConfirmModal({ type, onConfirm, onCancel }: { type: ModalType; onConfirm: () => void; onCancel: () => void }) {
    if (!type) return null;
    const config = {
        suspend: { title: 'Suspend user?', message: 'Are you sure you want to suspend this user?', confirmText: 'Yes, suspend' },
        unsuspend: { title: 'Un-suspend user', message: 'Are you sure you want to un-suspend this user?', confirmText: 'Yes, un-suspend' },
        delete: { title: 'Delete account', message: 'Are you sure you want to delete this user?', confirmText: 'Yes, delete' },
    };
    const { title, message, confirmText } = config[type];
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
                <div className="w-12 h-12 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">⚠️</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">{title}</h2>
                <p className="text-sm text-slate-500 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="flex-1 py-2.5 bg-[#B8860B] text-white rounded-xl text-sm font-medium hover:bg-[#9a7009] transition-colors">
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Tab: Applicant Details ───────────────────────────────────────────────────
function ApplicantDetails() {
    return (
        <div className="space-y-3">
            {/* Onboarding Info */}
            <div className="border border-slate-100 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm font-semibold text-slate-800">Onboarding information</span>
                    <ChevronUp size={16} className="text-slate-400" />
                </div>
                <div className="px-5 pb-5 border-t border-slate-100">
                    <InfoGrid items={[
                        { label: 'First name', value: 'Cynthia' },
                        { label: 'Last name', value: 'Chia' },
                        { label: 'Phone Number', value: '07044809821' },
                        { label: 'Email Address', value: 'cynthianguevese@gmail.com' },
                    ]} />
                </div>
            </div>
            <AccordionSection title="Identity Verification">
                <InfoGrid items={[
                    { label: 'ID Type', value: 'National ID' },
                    { label: 'ID Number', value: 'NIN-123456789' },
                    { label: 'BVN', value: '22012345678' },
                    { label: 'Verification Status', value: 'Verified' },
                ]} />
            </AccordionSection>
            <AccordionSection title="Bank details">
                <InfoGrid items={[
                    { label: 'Bank Name', value: 'First Bank' },
                    { label: 'Account Number', value: '3012345678' },
                    { label: 'Account Name', value: 'Chia Cynthia Nguevese' },
                ]} />
            </AccordionSection>
            <AccordionSection title="Next of Kin">
                <InfoGrid items={[
                    { label: 'Full Name', value: 'John Chia' },
                    { label: 'Relationship', value: 'Brother' },
                    { label: 'Phone', value: '08012345678' },
                ]} />
            </AccordionSection>
            <AccordionSection title="Address">
                <InfoGrid items={[
                    { label: 'Street Address', value: '12 Broad Street' },
                    { label: 'City', value: 'Lagos' },
                    { label: 'State', value: 'Lagos State' },
                    { label: 'Country', value: 'Nigeria' },
                ]} />
            </AccordionSection>
            <AccordionSection title="Investment Profile">
                <InfoGrid items={[
                    { label: 'Risk Tolerance', value: 'Moderate' },
                    { label: 'Investment Goal', value: 'Wealth Growth' },
                    { label: 'Investment Horizon', value: '5-10 years' },
                ]} />
            </AccordionSection>
        </div>
    );
}

// ─── Tab: Transaction History ─────────────────────────────────────────────────
function TransactionHistory() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">All transaction history</h3>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                    <Calendar size={16} />
                </button>
            </div>
            {MOCK_TRANSACTIONS.map((group) => (
                <div key={group.date} className="space-y-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{group.date}</p>
                    {group.items.map((tx, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                    tx.type === 'credit' ? "bg-emerald-50" : "bg-red-50"
                                )}>
                                    {tx.type === 'credit'
                                        ? <TrendingDown size={14} className="text-emerald-500" />
                                        : <TrendingUp size={14} className="text-red-400" />
                                    }
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">{tx.label}</p>
                                    <p className="text-xs text-slate-400">{tx.sub}</p>
                                </div>
                            </div>
                            <span className={cn(
                                "text-sm font-bold",
                                tx.type === 'credit' ? "text-emerald-500" : "text-red-400"
                            )}>{tx.amount}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Tab: Investments ─────────────────────────────────────────────────────────
function Investments() {
    const inv = MOCK_INVESTMENTS;
    return (
        <div className="space-y-5">
            {/* Overview stats */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-4">Overview</h3>
                <div className="grid grid-cols-4 divide-x divide-slate-100">
                    {[
                        { label: 'Total Portfolio Value', value: inv.totalPortfolio },
                        { label: 'Active investments', value: inv.activeInvestments },
                        { label: 'Total Returns Earned', value: inv.totalReturns },
                        { label: 'Pending Maturities', value: inv.pendingMaturities },
                    ].map(({ label, value }) => (
                        <div key={label} className="px-4 first:pl-0 last:pr-0">
                            <p className="text-xs text-slate-400 mb-1">{label}</p>
                            <p className="text-xl font-bold text-slate-900">{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Breakdown table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-700">Investment Breakdown</h3>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-50">
                            {['S/N', 'Investment product', 'Amount Invested', 'Current Value', 'Status', 'Maturity date'].map(col => (
                                <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {inv.breakdown.map((row) => (
                            <tr key={row.sn} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-3.5 text-sm text-slate-400">{row.sn}</td>
                                <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{row.product}</td>
                                <td className="px-5 py-3.5 text-sm text-slate-600">{row.invested}</td>
                                <td className="px-5 py-3.5 text-sm font-semibold text-slate-900">{row.current}</td>
                                <td className="px-5 py-3.5">
                                    <span className="text-xs font-semibold text-emerald-500">{row.status}</span>
                                </td>
                                <td className="px-5 py-3.5 text-sm text-slate-500">{row.maturity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UserDetail() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [activeTab, setActiveTab] = useState<TabType>('applicant');
    const [userStatus, setUserStatus] = useState<UserStatus>(MOCK_USER.status);
    const [modal, setModal] = useState<ModalType>(null);
    const [actionsOpen, setActionsOpen] = useState(false);

    const handleAction = (action: 'suspend' | 'unsuspend' | 'delete') => {
        setActionsOpen(false);
        setModal(action);
    };

    const handleConfirm = () => {
        if (modal === 'suspend') setUserStatus('Suspended');
        if (modal === 'unsuspend') setUserStatus('Active');
        if (modal === 'delete') navigate('/dashboard/users');
        setModal(null);
    };

    const tabs: { key: TabType; label: string }[] = [
        { key: 'applicant', label: 'Applicant details' },
        { key: 'transactions', label: 'Transaction history' },
        { key: 'investments', label: 'Investments' },
    ];

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <button
                    onClick={() => navigate('/dashboard/users')}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors font-medium"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
                <span className="text-slate-300">|</span>
                <button onClick={() => navigate('/dashboard/users')} className="text-slate-400 hover:text-slate-600 transition-colors">
                    User Management
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-semibold">{MOCK_USER.name}</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-100">
                {tabs.map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={cn(
                            "px-4 pb-3 text-sm font-medium transition-all border-b-2 -mb-px",
                            activeTab === key
                                ? "border-[#B8860B] text-[#B8860B]"
                                : "border-transparent text-slate-400 hover:text-slate-700"
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Body */}
            <div className="flex gap-6">
                {/* Left: User Card */}
                <div className="w-64 shrink-0 space-y-4">
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
                        <img
                            src={MOCK_USER.avatar}
                            alt={MOCK_USER.name}
                            className="w-20 h-20 rounded-full object-cover mx-auto mb-3 ring-4 ring-slate-50"
                        />
                        <h2 className="text-sm font-bold text-slate-900">{MOCK_USER.name}</h2>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">{MOCK_USER.id}</p>

                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-left">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-400">Status</span>
                                <span className={cn(
                                    "text-xs font-bold flex items-center gap-1",
                                    userStatus === 'Active' && "text-emerald-500",
                                    userStatus === 'Suspended' && "text-yellow-600",
                                    userStatus === 'Deactivated' && "text-red-500",
                                )}>
                                    <span className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        userStatus === 'Active' && "bg-emerald-500",
                                        userStatus === 'Suspended' && "bg-yellow-500",
                                        userStatus === 'Deactivated' && "bg-red-500",
                                    )} />
                                    {userStatus}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-400">Date joined</span>
                                <span className="text-xs font-semibold text-slate-700">{MOCK_USER.dateJoined}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-400">Last login</span>
                                <span className="text-xs font-semibold text-slate-700">{MOCK_USER.lastLogin}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions button */}
                    <div className="relative">
                        <button
                            onClick={() => setActionsOpen(!actionsOpen)}
                            className="w-full py-3 bg-[#B8860B] text-white rounded-xl text-sm font-semibold hover:bg-[#9a7009] transition-colors"
                        >
                            Actions
                        </button>
                        {actionsOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setActionsOpen(false)} />
                                <div className="absolute left-0 right-0 top-14 z-20 bg-white border border-slate-100 rounded-xl shadow-xl py-1 overflow-hidden">
                                    {[
                                        { label: 'Suspend user', action: 'suspend' as const },
                                        { label: 'Un-suspend user', action: 'unsuspend' as const },
                                        { label: 'Delete account', action: 'delete' as const, danger: true },
                                    ].map(({ label, action, danger }) => (
                                        <button
                                            key={action}
                                            onClick={() => handleAction(action)}
                                            className={cn(
                                                "w-full text-left px-4 py-2.5 text-sm transition-colors",
                                                danger ? "text-red-500 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50"
                                            )}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right: Tab Content */}
                <div className="flex-1 min-w-0 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                    {activeTab === 'applicant' && <ApplicantDetails />}
                    {activeTab === 'transactions' && <TransactionHistory />}
                    {activeTab === 'investments' && <Investments />}
                </div>
            </div>

            {/* Modal */}
            {modal && (
                <ConfirmModal
                    type={modal}
                    onConfirm={handleConfirm}
                    onCancel={() => setModal(null)}
                />
            )}
        </div>
    );
}