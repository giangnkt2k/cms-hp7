export const useApiServices = () => {
  const { $api } = useNuxtApp()
  const { showApiError, t } = useUtility()
  const accessToken = useAccessToken()

  //   Request intercept
  $api.interceptors.request.use((config) => {
    config.headers = {
      authorization: accessToken.value || 'undefined',
      ...config.headers
    }

    return config
  })

  // Response Interceptor
  $api.interceptors.response.use(
    (response) => {
      if (response.data.code !== 0) {
        showApiError(response.data.msg)
      }

      return response
    },
    (error) => {
      if (process.dev) {
        // eslint-disable-next-line no-console
        console.log(error)
      }

      showApiError(t('api.error.general'))
      return null
    }
  )

  

  return {
  }
}
