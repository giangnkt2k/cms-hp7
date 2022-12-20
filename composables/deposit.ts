import { DEPOSIT_STATUS } from '~~/types/deposit'

export const useDeposit = () => {
  const { $t } = useNuxtApp()

  const readableDepositStatus = (status: DEPOSIT_STATUS) => {
    switch (status) {
      case DEPOSIT_STATUS.APPROVED:
        return $t('deposit.status.approved')

      case DEPOSIT_STATUS.PENDING:
        return $t('deposit.status.pending')

      case DEPOSIT_STATUS.REJECTED:
        return $t('deposit.status.rejected')

      default:
        return $t('deposit.status.pending')
    }
  }

  const depositStatuses = computed(() => [
    {
      text: $t('deposit.status.approved'),
      value: DEPOSIT_STATUS.APPROVED
    },
    {
      text: $t('deposit.status.pending'),
      value: DEPOSIT_STATUS.PENDING
    },
    {
      text: $t('deposit.status.rejected'),
      value: DEPOSIT_STATUS.REJECTED
    }
  ])

  return {
    depositStatuses,

    readableDepositStatus
  }
}
