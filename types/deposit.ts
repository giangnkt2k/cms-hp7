import { IMember } from './member'

export interface ApprovedBy {
    username: string;
}

export interface DepositAccount {
    created_at: string;
    updated_at: string;
    id: number;
    bank_name: string;
    account_number: string;
    branch: string;
    account_holder: string;
    is_public: boolean;
    is_enabled: boolean;
}

export enum DEPOSIT_STATUS {
  PENDING,
  APPROVED,
  REJECTED,
}

export interface IDeposit {
    created_at: string;
    reviewed_at: string;
    updated_at: string;
    id: number;
    amount: number;
    status: DEPOSIT_STATUS;
    comments: null | string;
    remarks: null | string;
    approved_by: ApprovedBy | null;
    deposit_account: DepositAccount | null;
    app_user: IMember;
}
