import { RouteLocationRaw } from 'vue-router'

export interface INavigationItem {
    id: string,
    name: string,
    child?: INavigationItem[],
    route?: RouteLocationRaw
}
