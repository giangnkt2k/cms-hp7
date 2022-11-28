import { ApiRoutes, PaginatedResponse } from '~~/types/api'
import { ILoginResponse } from '~~/types/authentication'
import { IMember } from '~~/types/member'

export const useApiServices = () => {
  const { $api: api } = useNuxtApp()
  const { logout } = useAuthentication()
  const { showApiError, t } = useUtility()
  const accessToken = useAccessToken()

  //   Request intercept
  api.interceptors.request.clear()
  api.interceptors.request.use((config) => {
    config.headers = {
      authorization: `Bearer ${accessToken.value}`,
      ...config.headers
    }

    if (process.dev) {
      // eslint-disable-next-line no-console
      console.log({ config })
    }

    return config
  }, (error) => {
    if (process.dev) {
      // eslint-disable-next-line no-console
      console.log('Request error: ', { error })
    }
  })

  // Response Interceptor
  api.interceptors.response.clear()
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log('Response error: ', { error })
      }

      if (error.response) {
        if (error.response.status === 401) {
          logout()
          return Promise.resolve(null)
        }

        showApiError(error.response.data.message)
        return Promise.resolve(null)
      }

      showApiError(t('api.error.general'))
      return Promise.resolve(null)
    }
  )

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
