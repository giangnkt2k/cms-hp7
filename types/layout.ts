import { RouteLocationRaw } from 'vue-router'

export interface INavigationItem {
    id: string,
    name: string,
    routeName?: string,
    child?: INavigationItem[],
    route?: RouteLocationRaw
}
