/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface Investment {
    investment_id: number;
    transaction_id: string;
    client_id: number;
    userID: string;
    full_name: string;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    product_type: string;
    product_name: string;
    currency: string;
    amount_paid: string;
    roi_percentage: string;
    total_expected_return: string;
    daily_interest: string;
    monthly_interest: string;
    yearly_interest: string;
    start_date: string;
    maturity_date: string;
    duration_days: number;
    due_date: string;
    liquidation_date: string | null;
    liquidation_reason: string | null;
    liquidated_amount: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface PullInvestmentsRequest {
    type: string;
    search?: string;
    status?: string;
    currency?: string;
    start: number;
    length: number;
    order_column: string;
    order_dir: 'ASC' | 'DESC';
}

export interface PullInvestmentsResponse {
    code: number;
    status: boolean;
    message: string;
    data: Investment[];
}

export interface ChangeInvestmentStatusRequest {
    tnx_id: string;
    newstatus: string;
}

export interface GenericResponse {
    code: number;
    status: boolean;
    message: string;
    data?: any;
}
