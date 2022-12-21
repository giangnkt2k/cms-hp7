<script lang="ts" setup>
import { CreateDepositAccountBody, IDepositAccount } from '~~/types/deposit-accounts'

type Emits = {
  (event: 'reload'): void
}

type Props = {
  depositAccount: IDepositAccount
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { updateDepositAccountService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const isUpdatingWithdrawal = ref(false)

const updateDepositAccount = async (form: CreateDepositAccountBody) => {
  isUpdatingWithdrawal.value = true

  const response = await updateDepositAccountService(props.depositAccount.id, form).catch(() => {
    $notify.error($t('update-deposit-accounts.failed'))
  })

  if (response?.data) {
    $notify.success($t('update-deposit-accounts.success'))
    emit('reload')
  }

  isUpdatingWithdrawal.value = false
}
</script>

<template>
  <DepositAccountForm
    :deposit-account="depositAccount"
    :is-loading="isUpdatingWithdrawal"
    @submit="updateDepositAccount"
  />
</template>

<style scoped></style>
