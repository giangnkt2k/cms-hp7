// Generated by https://quicktype.io

import { IMember } from './member'

export interface CreatedBy {
    username: string;
}

export enum WITHDRAWAL_STATUS {
  PENDING,
  APPROVED,
  REJECTED,
}

export interface IWithdrawal {
    created_at: string;
    updated_at: string;
    id: number;
    amount: number;
    status: WITHDRAWAL_STATUS;
    comments: null;
    remarks: null;
    reviewed_at: null;
    app_user: IMember;
    approved_by: CreatedBy;
}