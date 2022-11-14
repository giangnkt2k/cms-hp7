import { v4 } from 'uuid'
import { INavigationItem } from '~~/types/layout'

export const useAccessToken = () => useState('access-token', () => useCookie('access-token'))
export const useIsAuthorized = () => useState('is-authorized', () => false)
export const useNavigationItems = () => useState<INavigationItem[]>('navigation-items', () => [
  {
    id: v4(),
    name: 'Dashboard',
    route: '/'
  },
  {
    id: v4().toString(),
    name: 'Members',
    child: [
      {
        id: v4().toString(),
        name: 'Member list',
        route: '/members'
      }
    ]
  }
])
