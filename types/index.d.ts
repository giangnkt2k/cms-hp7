import { AxiosInstance } from 'axios'
import dayjs from 'dayjs'

declare module 'nuxt/dist/app/nuxt' {
  export interface NuxtApp {
    $api: AxiosInstance;
    $dayjs: typeof dayjs
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

declare module '#app' {
  interface PageMeta {
    pageTitle?: string
  }
}

export {}
