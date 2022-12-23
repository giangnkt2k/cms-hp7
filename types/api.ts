export enum ApiRoutes {
  LOGIN = '/user/signin',
  APP_USER_LIST = '/app-users/list',
  CREATE_APP_USER = '/app-users/create',
  UPDATE_APP_USER = '/app-users/update',
  FREEZE_APP_USER = '/cms/members/:id/freeze',
  UNFREEZE_APP_USER = '/cms/members/:id/unfreeze',
  RESET_APP_USER_PASSWORD = '/app-users/update/:id',
  RESET_APP_USER_WITHDRAW_PASSWORD = '/app-users/update/:id',
  DELETE_APP_USER = '/app-users/disabled',
  MODIFY_USER_BALANCE = '/app-users/modified-balance/:id',
  GET_DEPOSITS = '/deposit/list',
  READ_FILES = '/uploads',
  REVIEW_DEPOSIT = '/deposit/review/:id',
  CREATE_DEPOSIT = '/deposit/create',
  GET_WITHDRAWALS = '/withdrawal/list',
  REVIEW_WITHDRAWAL = '/cms/withdrawals/:id/review',
  GET_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  CREATE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  UPDATE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  DELETE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  GET_TRANSACTIONS = '/cms/transactions'
}

export type PaginatedResponse<DataType> = {
  data: DataType;
  count: number;
};
