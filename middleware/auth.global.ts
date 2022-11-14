export default defineNuxtRouteMiddleware(async (to) => {
  const { $routesList } = useNuxtApp()

  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()

  if (to.name === $routesList.login && accessToken.value) {
    return navigateTo({ name: $routesList.index })
  }

  if (to.name !== $routesList.login && accessToken.value && !isAuthorized.value) {
    const isTokenValid = false
    isAuthorized.value = true

    if (!isTokenValid) {
      accessToken.value = ''
      return navigateTo({ name: $routesList.login })
    }
  }

  if (to.name !== $routesList.login && !accessToken.value) {
    return navigateTo({ name: $routesList.login })
  }
})
