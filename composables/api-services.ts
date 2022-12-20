import { ApiRoutes, PaginatedResponse } from '~~/types/api'
import { TablePageSize } from '~~/types/app-table'
import { ILoginResponse } from '~~/types/authentication'
import { DEPOSIT_STATUS, IDeposit } from '~~/types/deposit'
import { IMember, ModifyUserBalanceBodyRequest } from '~~/types/member'
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
    return api.put(`${ApiRoutes.UPDATE_APP_USER}/${id}`, data)
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
    return api.delete(`${ApiRoutes.DELETE_APP_USER}/${id}`)
  }

  const modifyUserBalanceService = (userId: number, data: ModifyUserBalanceBodyRequest) => {
    return api.patch(ApiRoutes.MODIFY_USER_BALANCE.replace(':id', `${userId}`), data)
  }

  const getDepositsService = (page = 1, pageSize: TablePageSize = 100) => {
    return api.get<PaginatedResponse<IDeposit[]>>(ApiRoutes.GET_DEPOSITS, {
      params: {
        page,
        pageSize
      }
    })
  }

  const reviewDepositService = (depositId: number, payload: { status: DEPOSIT_STATUS, remarks?: string, comments?: string}) => {
    return api.post<IDeposit>(ApiRoutes.REVIEW_DEPOSIT.replace(':id', depositId.toString()), payload)
  }

  const createDepositService = (payload: {userId: number, amount: number}) => {
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

  const reviewWithdrawalService = (depositId: number, payload: { status: WITHDRAWAL_STATUS, remarks?: string, comments?: string}) => {
    return api.post<IWithdrawal>(ApiRoutes.REVIEW_WITHDRAWAL.replace(':id', depositId.toString()), payload)
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
    reviewWithdrawalService
  }
}
