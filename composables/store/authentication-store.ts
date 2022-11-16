export const useAccessToken = () => useState('access-token', () => useCookie('access-token'))
export const useUsername = () => useState('username', () => useCookie('username'))
