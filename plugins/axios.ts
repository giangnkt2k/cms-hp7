import axios from 'axios'

export default defineNuxtPlugin(() => {
  const { $t } = useNuxtApp()
  const config = useRuntimeConfig()
  const api = axios.create({
    baseURL: config.public.API_ENDPOINT
  })
  const { logout } = useAuthentication()
  const { showApiError } = useUtility()
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

      showApiError($t('api.error.general'))
      return Promise.resolve(null)
    }
  )

  return {
    provide: {
      api
    }
  }
})
