import { ApiRoutes, PaginatedResponse } from '~~/types/api'
import { ILoginResponse } from '~~/types/authentication'
import { IMember } from '~~/types/member'

export const useApiServices = () => {
  const { $api: api } = useNuxtApp()

  const loginService = (username: string, password: string) => {
    return api.post<ILoginResponse>(ApiRoutes.LOGIN, { username, password })
  }

  const appUserListService = (data: { page: number, limit: number }) => {
    return api.get<PaginatedResponse<IMember[]>>(ApiRoutes.APP_USER_LIST, { params: data })
  }

  const createUserService = (username: string, password: string) => {
    return api.post(ApiRoutes.CREATE_APP_USER, { username, password })
  }

  const updateUserService = (id: number, data: Partial<IMember>) => {
    return api.patch(`${ApiRoutes.UPDATE_APP_USER}/${id}`, data)
  }

  const deleteUserService = (id: number) => {
    return api.delete(`${ApiRoutes.DELETE_APP_USER}/${id}`)
  }

  return {
    loginService,
    appUserListService,
    createUserService,
    deleteUserService,
    updateUserService
  }
}
