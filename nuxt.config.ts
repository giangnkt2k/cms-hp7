import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import en from './locales/en'
import vi from './locales/vi.json'
import zh from './locales/zh.json'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  experimental: {
    externalVue: true
  },
  typescript: {
    shim: false,
    typeCheck: true
  },
  imports: {
    dirs: [
      'composables/**'
    ]
  },

  app: {
    // Head
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }
      ]
    }
  },

  // CSS files
  css: [],

  modules: [
    'nuxt-windicss',
    '@pinia/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-lodash'
  ],
  buildModules: ['nuxt-typed-router'],

  // i18n config
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      messages: {
        en,
        vi,
        zh
      }
    }
  },

  // Vite config
  vite: {
    plugins: [
      eslintPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },

  runtimeConfig: {
    public: {
      API_ENDPOINT: process.env.API_ENDPOINT
    }
  }
})
