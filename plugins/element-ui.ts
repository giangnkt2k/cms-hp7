import ElementPlus, { ElNotification, ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(ElementPlus)

  return {
    provide: {
      notify: ElNotification,
      message: ElMessageBox
    }
  }
})
