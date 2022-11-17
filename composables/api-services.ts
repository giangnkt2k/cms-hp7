import { ApiRoutes } from '~~/types/api'
import { ILoginResponse } from '~~/types/authentication'

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
      if (response.status === 401) {
        logout()
      }

      return response
    },
    (error) => {
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log({ error })
      }
      showApiError(t('api.error.general'))
      return null
    }
  )

  const loginService = (username: string, password: string) => {
    return api.post<ILoginResponse>(ApiRoutes.LOGIN, { username, password })
  }

  return {
    loginService
  }
}
