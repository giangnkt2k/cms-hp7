export type IDepositAccount = {
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

export type CreateDepositAccountBody = Pick<IDepositAccount, 'bank_name' | 'branch' | 'account_holder' | 'account_number' |'is_enabled' | 'is_public'>
