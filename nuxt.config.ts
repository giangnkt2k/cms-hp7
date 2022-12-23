import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

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
    '@vueuse/nuxt',
    'nuxt-lodash',
    'nuxt-typed-router'
  ],

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
      API_ENDPOINT: process.env.API_ENDPOINT,
      LINK_IMG: process.env.LINK_IMG
    }
  }
})
