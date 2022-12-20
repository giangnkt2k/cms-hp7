import { v4 } from 'uuid'
import { INavigationItem } from '~~/types/layout'
import { RouteNames } from '~~/types/routes'

export const useNavigationItems = () => useState<INavigationItem[]>('navigation-items', () => [
  {
    id: v4().toString(),
    name: 'Dashboard',
    routeName: RouteNames.DASHBOARD,
    route: '/'
  },
  {
    id: v4().toString(),
    name: 'Members',
    child: [
      {
        id: v4().toString(),
        name: 'Member List',
        route: '/members',
        routeName: RouteNames.MEMBERS
      }
    ]
  },
  {
    id: v4().toString(),
    name: 'Finance',
    child: [
      {
        id: v4().toString(),
        name: 'Deposit',
        route: '/deposit',
        routeName: RouteNames.DEPOSIT
      },
      {
        id: v4().toString(),
        name: 'Withdrawal',
        route: '/withdrawals',
        routeName: RouteNames.WITHDRAWALS
      }
    ]
  }
])
