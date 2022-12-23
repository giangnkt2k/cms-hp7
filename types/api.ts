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
  REVIEW_WITHDRAWAL = '/withdrawal/review/:id',
  GET_DEPOSIT_ACCOUNTS = '/deposit-account/list',
  CREATE_DEPOSIT_ACCOUNTS = '/deposit-account/create',
  UPDATE_DEPOSIT_ACCOUNTS = '/deposit-account/update',
  DELETE_DEPOSIT_ACCOUNTS = '/cms/deposit-accounts',
  GET_TRANSACTIONS = '/transaction/list',
  GET_ORDER = '/order/list/histories'
}

export type PaginatedResponse<DataType> = {
  data: DataType;
  count: number;
};
