import { ITransaction, TRANSACTION_TYPES } from '~~/types/transactions'

export const useTransaction = () => {
  const { $t } = useNuxtApp()

  const readableTransactionType = (type: TRANSACTION_TYPES) => {
    switch (type) {
      case TRANSACTION_TYPES.WITHDRAW:
        return $t('transactions.type.withdrawal')

      case TRANSACTION_TYPES.DEPOSIT:
        return $t('transactions.type.deposit')

      case TRANSACTION_TYPES.BUY:
        return $t('transactions.type.buy')

      case TRANSACTION_TYPES.SELL:
        return $t('transactions.type.sell')

      default:
        return '-'
    }
  }

  const getremark = (transaction: ITransaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPES.DEPOSIT:
        return transaction.deposit?.remark

      case TRANSACTION_TYPES.WITHDRAW:
        return transaction.withdrawal?.remark

      case TRANSACTION_TYPES.BUY:
        return transaction.position?.stock.N

      case TRANSACTION_TYPES.SELL:
        return transaction.position?.stock.N

      default:
        return ''
    }
  }

  const getComments = (transaction: ITransaction) => {
    switch (transaction.type) {
      case TRANSACTION_TYPES.DEPOSIT:
        return transaction.deposit?.comments

      case TRANSACTION_TYPES.WITHDRAW:
        return transaction.withdrawal?.comments

      case TRANSACTION_TYPES.BUY:
        return transaction.position?.stock.N

      case TRANSACTION_TYPES.SELL:
        return transaction.position?.stock.N

      default:
        return ''
    }
  }
  return {
    readableTransactionType,
    getremark,
    getComments
  }
}
