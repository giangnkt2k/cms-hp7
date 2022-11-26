import { ApiRoutes, PaginatedResponse } from '~~/types/api'
import { ILoginResponse } from '~~/types/authentication'
import { IMember } from '~~/types/member'

export const useApiServices = () => {
  const { $api: api } = useNuxtApp()
  const { logout } = useAuthentication()
  const { showApiError, t } = useUtility()
  const accessToken = useAccessToken()

  //   Request intercept
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
  })

  // Response Interceptor
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log({ error })
      }

      if (error.response) {
        if (error.response.status === 401) {
          logout()
        }
      }

      showApiError(t('api.error.general'))
      return Promise.reject(error)
    }
  )

  const loginService = (username: string, password: string) => {
    return api.post<ILoginResponse>(ApiRoutes.LOGIN, { username, password })
  }

  const appUserListService = (data: { page: number, limit: number }) => {
    return api.get<PaginatedResponse<IMember[]>>(ApiRoutes.APP_USER_LIST, { params: data })
  }

  return {
    loginService,
    appUserListService
  }
}
