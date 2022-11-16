export default defineNuxtRouteMiddleware((to) => {
  const { $routesList } = useNuxtApp()

  const accessToken = useAccessToken()

  if (to.name === $routesList.login && accessToken.value) {
    return navigateTo({ name: $routesList.index })
  }

  if (to.name !== $routesList.login) {
    const isTokenValid = !!accessToken.value

    if (!isTokenValid) {
      accessToken.value = ''
      return navigateTo({ name: $routesList.login })
    }
  }

  if (to.name !== $routesList.login && !accessToken.value) {
    return navigateTo({ name: $routesList.login })
  }
})
