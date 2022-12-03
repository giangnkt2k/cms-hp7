import numeral from 'numeral'
import { ElNotification } from 'element-plus'

export const useUtility = () => {
  const { $dayjs } = useNuxtApp()

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

  return {
    showApiError,
    toMoneyFormat,
    dateFormatter
  }
}
