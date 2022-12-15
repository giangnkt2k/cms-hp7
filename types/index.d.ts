import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
import { ElNotification, ElMessageBox } from 'element-plus'
import { i18n } from '~~/plugins/i18n'

declare module 'nuxt/dist/app/nuxt' {
  export interface NuxtApp {
    $api: AxiosInstance;
    $dayjs: typeof dayjs;
    $notify: typeof ElNotification;
    $message: typeof ElMessageBox;
    $t: typeof i18n.global.t
    $i18n: typeof i18n.global
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
    $dayjs: typeof dayjs;
    $notify: typeof ElNotification;
    $message: typeof ElMessageBox;
    $t: typeof i18n.global.t
    $i18n: typeof i18n.global
  }
}

declare module '#app' {
  interface PageMeta {
    pageTitle?: string;
  }
}

export {}
