import { apiClient } from './client';

export interface DashboardStatsPayload {
    year: number;
    month?: string;
    day?: string;
}

export interface UserRegistrationStatus {
    labels: string[];
    values: number[];
    year: number;
    total_in_year: number;
    is_filtered: boolean;
    filtered_month: string | null;
}

export interface DashboardData {
    "Total Users": number;
    "Completed KYC": number;
    "Pending KYC": number;
    "Available Products": number;
    "Recent Transactions": number;
    "User Registration Status": UserRegistrationStatus;
    "TotalRegistrations": number;
    "DisplayedYear": number;
    "FilteredByMonth": string | null;
    "FilteredByDay": string | null;
}

export interface DashboardResponse {
    code: number;
    status: boolean;
    message: string;
    data: DashboardData;
}

// Transaction History Types
export interface TransactionHistoryPayload {
    email?: string;
    tnx_type?: string;
    status?: string;
    limit?: number;
    page?: number;
    start_date?: string;
    end_date?: string;
}

export interface Transaction {
    id: number;
    tnx_id: string;
    tnx_descript: string;
    tnx_type: string;
    email: string;
    fname: string;
    lname: string;
    full_name: string;
    clientID: string;
    amount: string;
    status: number;
    created: string;
    paid_to: string;
    currency: string;
    method: string;
    payment_type: string;
    access_code: string;
    authorization_url: string;
}

export interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export interface TransactionHistoryResponse {
    code: number;
    status: boolean;
    message: string;
    data: {
        transactions: Transaction[];
        pagination: Pagination;
        filters_applied: {
            email: string;
            start_date: string;
            end_date: string;
            status: string;
            tnx_type: string;
        };
    };
}

// KYC List Types
export interface KycListPayload {
    email?: string;
    tnx_type?: string;
    status?: string;
    limit?: number;
    page?: number;
    start_date?: string;
    end_date?: string;
}

export interface KycUser {
    ID: string;
    NAME: string;
    email: string;
    progress: string;
    status: string;
    lastupdated: string;
}

export interface KycListResponse {
    code: number;
    status: boolean;
    message: string;
    data: {
        users: KycUser[];
        pagination: Pagination;
    };
}

export const dashboardService = {
    getDashboardStats: async (payload: DashboardStatsPayload) => {
        try {
            const response = await apiClient<DashboardResponse>('POST', 'dashboard_stats', payload);
            return response;
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            throw error;
        }
    },

    getTransactionHistory: async (payload: TransactionHistoryPayload) => {
        try {
            const response = await apiClient<TransactionHistoryResponse>('POST', 'tranxHist', payload);
            return response;
        } catch (error) {
            console.error('Error fetching transaction history:', error);
            throw error;
        }
    },

    getKycList: async (payload: KycListPayload) => {
        try {
            const response = await apiClient<KycListResponse>('POST', 'kycLists', payload);
            return response;
        } catch (error) {
            console.error('Error fetching KYC list:', error);
            throw error;
        }
    }
};
