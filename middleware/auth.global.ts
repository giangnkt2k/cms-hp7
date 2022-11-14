export default defineNuxtRouteMiddleware((to) => {
  const { $routesList } = useNuxtApp()

  const accessToken = useAccessToken()
  const isAuthorized = useIsAuthorized()

  if (to.name === $routesList.login && accessToken.value) {
    return navigateTo({ name: $routesList.index })
  }

  if (to.name !== $routesList.login && accessToken.value && !isAuthorized.value) {
    // TODO: Actual token check
    const isTokenValid = !!accessToken.value
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
