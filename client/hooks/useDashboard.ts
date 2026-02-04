import { useQuery } from '@tanstack/react-query';
import {
    dashboardService,
    DashboardStatsPayload,
    TransactionHistoryPayload,
    KycListPayload
} from '@/lib/api/dashboardService';

export const useDashboardStats = (payload: DashboardStatsPayload) => {
    return useQuery({
        queryKey: ['dashboardStats', payload],
        queryFn: () => dashboardService.getDashboardStats(payload),
    });
};

export const useTransactionHistory = (payload: TransactionHistoryPayload) => {
    return useQuery({
        queryKey: ['transactionHistory', payload],
        queryFn: () => dashboardService.getTransactionHistory(payload),
    });
};

export const useKycList = (payload: KycListPayload) => {
    return useQuery({
        queryKey: ['kycList', payload],
        queryFn: () => dashboardService.getKycList(payload),
    });
};
