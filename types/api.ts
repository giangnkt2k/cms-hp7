export enum ApiRoutes {
  LOGIN = '/api/v1/auth/login/cms',
  APP_USER_LIST = '/api/v1/cms/app-users',
  CREATE_APP_USER = '/api/v1/cms/app-users',
  UPDATE_APP_USER = '/api/v1/cms/app-users',
  DELETE_APP_USER = '/api/v1/cms/app-users'
}

export type PaginatedResponse<DataType> = {
  data: DataType;
  count: number;
};
