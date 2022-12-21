export enum ApiRoutes {
  LOGIN = '/cms/auth',
  APP_USER_LIST = '/cms/members',
  CREATE_APP_USER = '/cms/members',
  UPDATE_APP_USER = '/cms/members',
  FREEZE_APP_USER = '/cms/members/:id/freeze',
  UNFREEZE_APP_USER = '/cms/members/:id/unfreeze',
  RESET_APP_USER_PASSWORD = '/cms/members/:id/reset-password',
  RESET_APP_USER_WITHDRAW_PASSWORD = '/cms/members/:id/reset-withdraw-password',
  DELETE_APP_USER = '/cms/members',
  MODIFY_USER_BALANCE = '/cms/members/:id/modify-balance',
  GET_DEPOSITS = '/cms/deposits',
  READ_FILES = '/app/files',
  REVIEW_DEPOSIT = '/cms/deposits/:id/review',
  CREATE_DEPOSIT = '/cms/deposits',
  GET_WITHDRAWALS = '/cms/withdrawals',
  REVIEW_WITHDRAWAL = '/cms/withdrawals/:id/review',
  GET_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  CREATE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  UPDATE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  DELETE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts'
}

export type PaginatedResponse<DataType> = {
  data: DataType;
  count: number;
};
