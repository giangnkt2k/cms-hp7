import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'
import { ElNotification, ElMessageBox } from 'element-plus'

declare module 'nuxt/dist/app/nuxt' {
  export interface NuxtApp {
    $api: AxiosInstance;
    $dayjs: typeof dayjs;
    $notify: typeof ElNotification;
    $message: typeof ElMessageBox;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
    $dayjs: typeof dayjs;
    $notify: typeof ElNotification;
    $message: typeof ElMessageBox;
  }
}

declare module '#app' {
  interface PageMeta {
    pageTitle?: string;
    pageRouteName?: string;
  }
}

export {}
