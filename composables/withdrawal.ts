import { WITHDRAWAL_STATUS } from '~~/types/withdrawals'

export const useWithdrawal = () => {
  const { $t } = useNuxtApp()

  const readableWithdrawalStatus = (status: WITHDRAWAL_STATUS) => {
    switch (status) {
      case WITHDRAWAL_STATUS.APPROVED:
        return $t('withdrawals.status.approved')

      case WITHDRAWAL_STATUS.PENDING:
        return $t('withdrawals.status.pending')

      case WITHDRAWAL_STATUS.REJECTED:
        return $t('withdrawals.status.rejected')

      default:
        return $t('withdrawals.status.pending')
    }
  }

  const withdrawalStatuses = computed(() => [
    {
      text: $t('withdrawals.status.approved'),
      value: WITHDRAWAL_STATUS.APPROVED
    },
    {
      text: $t('withdrawals.status.pending'),
      value: WITHDRAWAL_STATUS.PENDING
    },
    {
      text: $t('withdrawals.status.rejected'),
      value: WITHDRAWAL_STATUS.REJECTED
    }
  ])

  return {
    withdrawalStatuses,

    readableWithdrawalStatus
  }
}
