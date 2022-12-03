import { createI18n } from 'vue-i18n'
import en from '~~/locales/en'
import vi from '~~/locales/vi.json'
import zh from '~~/locales/zh.json'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    vi,
    zh
  }
})

export default defineNuxtPlugin(() => {
  return {
    provide: {
      t: i18n.global.t,
      i18n: i18n.global
    }
  }
})
