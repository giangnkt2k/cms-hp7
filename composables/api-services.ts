import { MaybeRef } from '@vueuse/shared'
import { ApiRoutes, PaginatedResponse } from '~~/types/api'
import { TablePageSize } from '~~/types/app-table'
import { ILoginResponse } from '~~/types/authentication'
import { IDepositsAndWithdrawals, INewShares, ITradingHours, ITransactionsRate } from '~~/types/configDandW'
import { DEPOSIT_STATUS, IDeposit } from '~~/types/deposit'
import { CreateDepositAccountBody, IDepositAccount } from '~~/types/deposit-accounts'
import { IMember, ModifyUserBalanceBodyRequest } from '~~/types/member'
import { IOrder, ITransaction } from '~~/types/transactions'
import { IWithdrawal, WITHDRAWAL_STATUS } from '~~/types/withdrawals'

export const useApiServices = () => {
  const { $api: api } = useNuxtApp()

  const loginService = (username: string, password: string) => {
    return api.post<ILoginResponse>(ApiRoutes.LOGIN, { username, password })
  }

  const appUserListService = (data: { page: number, pageSize: number, keyword?: string }) => {
    return api.get<PaginatedResponse<IMember[]>>(ApiRoutes.APP_USER_LIST, { params: data })
  }

  const createUserService = (username: string, password: string) => {
    return api.post(ApiRoutes.CREATE_APP_USER, { username, password })
  }

  const updateUserService = (id: number, data: Partial<IMember>) => {
    return api.patch(`${ApiRoutes.UPDATE_APP_USER}/${id}`, data)
  }

  const freezeUserService = (id: number) => {
    return api.patch(ApiRoutes.FREEZE_APP_USER.replace(':id', `${id}`), { is_freeze: true })
  }

  const unfreezeUserService = (id: number) => {
    return api.patch(ApiRoutes.UNFREEZE_APP_USER.replace(':id', `${id}`), { is_freeze: false })
  }

  const resetUserPasswordService = (id: number, password: string) => {
    return api.patch(ApiRoutes.RESET_APP_USER_PASSWORD.replace(':id', `${id}`), { password })
  }

  const resetUserWithdrawPasswordService = (id: number, password: string) => {
    return api.patch(ApiRoutes.RESET_APP_USER_WITHDRAW_PASSWORD.replace(':id', `${id}`), { password })
  }

  const deleteUserService = (id: number) => {
    return api.patch(`${ApiRoutes.DELETE_APP_USER}/${id}`)
  }

  const modifyUserBalanceService = (userId: number, data: ModifyUserBalanceBodyRequest) => {
    return api.post(ApiRoutes.MODIFY_USER_BALANCE.replace(':id', `${userId}`), data)
  }

  const getDepositsService = (page = 1, pageSize: TablePageSize = 100) => {
    return api.get<PaginatedResponse<IDeposit[]>>(ApiRoutes.GET_DEPOSITS, {
      params: {
        page,
        pageSize
      }
    })
  }

  const reviewDepositService = (depositId: number, payload: { status: DEPOSIT_STATUS, remark?: string, comments?: string}) => {
    return api.post<IDeposit>(ApiRoutes.REVIEW_DEPOSIT.replace(':id', depositId.toString()), payload)
  }

  const createDepositService = (payload: {user_id: number, amount: number}) => {
    return api.post<IDeposit>(ApiRoutes.CREATE_DEPOSIT, payload)
  }

  const getWithdrawalsService = (page = 1, pageSize: TablePageSize = 100) => {
    return api.get<PaginatedResponse<IWithdrawal[]>>(ApiRoutes.GET_WITHDRAWALS, {
      params: {
        page,
        pageSize
      }
    })
  }

  const reviewWithdrawalService = (withdrawalId: number, payload: { status: WITHDRAWAL_STATUS, remark?: string, comments?: string}) => {
    return api.post<IWithdrawal>(ApiRoutes.REVIEW_WITHDRAWAL.replace(':id', withdrawalId.toString()), payload)
  }

  const depositAccountListService = (page = 1, pageSize: TablePageSize = 100) => {
    return api.get<PaginatedResponse<IDepositAccount[]>>(ApiRoutes.GET_DEPOSIT_ACCOUNTS, {
      params: {
        page,
        pageSize
      }
    })
  }

  const createDepositAccountService = (payload: CreateDepositAccountBody) => {
    return api.post<IDepositAccount>(ApiRoutes.CREATE_DEPOSIT_ACCOUNTS, payload)
  }

  const updateDepositAccountService = (id: number, payload: Partial<CreateDepositAccountBody>) => {
    return api.patch(`${ApiRoutes.UPDATE_DEPOSIT_ACCOUNTS}/${id}`, payload)
  }

  const deleteDepositAccountService = (id: number) => {
    return api.delete(`${ApiRoutes.DELETE_DEPOSIT_ACCOUNTS}/${id}`)
  }

  const transactionListService = ($page: MaybeRef<number> = 1, $pageSize: MaybeRef<TablePageSize> = 20) => {
    const page = unref($page)
    const pageSize = unref($pageSize)
    return api.get<PaginatedResponse<ITransaction[]>>(ApiRoutes.GET_TRANSACTIONS, { params: { page, pageSize } })
  }

  const orderListService = ($page: MaybeRef<number> = 1, $pageSize: MaybeRef<TablePageSize> = 20) => {
    const page = unref($page)
    const pageSize = unref($pageSize)
    return api.get<PaginatedResponse<IOrder[]>>(ApiRoutes.GET_ORDER, { params: { page, pageSize } })
  }

  const systemConfigService = (param: IDepositsAndWithdrawals) => {
    return api.patch(ApiRoutes.UPDATE_CONFIG, { deposits_and_withdrawals: param })
  }

  const systemConfigTransactionsRateService = (param: ITransactionsRate) => {
    return api.patch(ApiRoutes.UPDATE_CONFIG, { transactions_rate: param })
  }

  const systemConfigTradingHoursService = (param: ITradingHours) => {
    return api.patch(ApiRoutes.UPDATE_CONFIG, { trading_hours: param })
  }

  const systemConfigNewShareService = (param: INewShares) => {
    return api.patch(ApiRoutes.UPDATE_CONFIG, { new_shares: param })
  }

  const systemConfigOnlineService = (link: string) => {
    return api.patch(ApiRoutes.UPDATE_CONFIG, { online_customer_service: link })
  }

  const systemConfigDetailService = () => {
    return api.get(ApiRoutes.CONFIG_DETAIL)
  }

  return {
    loginService,
    appUserListService,
    createUserService,
    deleteUserService,
    updateUserService,
    modifyUserBalanceService,
    getDepositsService,
    freezeUserService,
    unfreezeUserService,
    resetUserPasswordService,
    resetUserWithdrawPasswordService,
    reviewDepositService,
    createDepositService,
    getWithdrawalsService,
    reviewWithdrawalService,
    depositAccountListService,
    createDepositAccountService,
    updateDepositAccountService,
    deleteDepositAccountService,
    transactionListService,
    orderListService,
    systemConfigService,
    systemConfigDetailService,
    systemConfigTransactionsRateService,
    systemConfigTradingHoursService,
    systemConfigNewShareService,
    systemConfigOnlineService
  }
}
