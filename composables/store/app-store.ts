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
        name: 'Members',
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
        name: 'Deposits',
        route: '/deposits',
        routeName: RouteNames.DEPOSITS
      },
      {
        id: v4().toString(),
        name: 'Withdrawals',
        route: '/withdrawals',
        routeName: RouteNames.WITHDRAWALS
      },
      {
        id: v4().toString(),
        name: 'Deposit Accounts',
        route: '/deposit-accounts',
        routeName: RouteNames.DEPOSIT_ACCOUNTS
      },
      {
        id: v4().toString(),
        name: 'Transactions',
        route: '/transactions',
        routeName: RouteNames.TRANSACTIONS
      },
      {
        id: v4().toString(),
        name: 'Orders',
        route: '/orders',
        routeName: RouteNames.ORDER
      }
    ]
  },
  {
    id: v4().toString(),
    name: 'System config',
    routeName: RouteNames.SYSTEM_CONFIG
  }
])
