export interface Agent {
    name: string;
}

export interface ApprovedBy {
    username: string;
}

export interface CreatedBy {
    username: string;
    agent: Agent;
}

export interface IMember {
    created_at: string;
    updated_at: string;
    id: number;
    username: string;
    real_name: string;
    id_front: string | null;
    id_back: string | null;
    id_number: string;
    phone: string;
    bank_name: string;
    bank_number: string;
    bank_branch: string;
    account_holder: string;
    balance_frozen: number;
    balance_avail: number;
    balance_avail_newshare: number;
    withdraw_password?: string;
    password?: string;
    can_ipo: boolean;
    is_playing_board: boolean;
    is_active: boolean;
    is_freeze: boolean;
    verification_status: number;
    created_by: CreatedBy | null;
    approved_by: ApprovedBy | null;
}

export enum BalanceModifierType {
    DECREASE,
    INCREASE,
}

export type ModifyUserBalanceBodyRequest = {
    amount: number,
    type: BalanceModifierType,
    comments: string,
    remark: string
}

export enum APP_USER_VERIFY_STATUS {
  PENDING,
  NOT_VERIFIED,
  VERIFIED,
}
