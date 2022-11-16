export const useAuthentication = () => {
  const { $typedRouter, $routesList } = useNuxtApp()
  const accessToken = useAccessToken()
  const username = useUsername()

  const isAuthenticated = computed(() => !!accessToken.value)

  const logout = () => {
    accessToken.value = ''
    $typedRouter.push({ name: $routesList.login })
  }

  return {
    username,
    accessToken,
    isAuthenticated,

    logout
  }
}
