import numeral from 'numeral'
import { ElNotification } from 'element-plus'
import { buildUrl } from 'build-url-ts'
import { ApiRoutes } from '~~/types/api'

export const useUtility = () => {
  const { $dayjs } = useNuxtApp()
  const config = useRuntimeConfig()

  const notify = ElNotification

  const showApiError = (message: string) => {
    notify.error(message)
  }

  const toMoneyFormat = (amount: number | string, format = '0.00') => {
    return numeral(amount).format(format)
  }

  const dateFormatter = (date: string | number | Date, format = 'DD/MM/YYYY') => {
    return $dayjs(date).format(format)
  }

  const getFileUrl = (id: number) => {
    return buildUrl(config.public.LINK_IMG, {
      path: `${ApiRoutes.READ_FILES}/${id}`
    })
  }

  return {
    showApiError,
    toMoneyFormat,
    dateFormatter,
    getFileUrl
  }
}
