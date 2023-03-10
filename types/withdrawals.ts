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

export interface IWithdrawal extends IMember {
    created_at: string;
    updated_at: string;
    id: number;
    amount: number;
    status: WITHDRAWAL_STATUS;
    comments?: string;
    remark?: string;
    reviewed_at?: Date;
    approved_by: CreatedBy;

}
