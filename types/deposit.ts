import { IDepositAccount } from './deposit-accounts'
import { IMember } from './member'

export interface ApprovedBy {
    username: string;
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
    remark: null | string;
    approved_by: ApprovedBy | null;
    deposit_account: IDepositAccount | null;
    app_user: IMember;
}
