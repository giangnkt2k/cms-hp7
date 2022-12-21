<script lang="ts" setup>
import { CreateDepositAccountBody } from '~~/types/deposit-accounts'

type Emits = {
  (event: 'reload'): void
}

const emit = defineEmits<Emits>()

const { createDepositAccountService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const isCreatingWithdrawal = ref(false)

const createDepositAccount = async (form: CreateDepositAccountBody) => {
  isCreatingWithdrawal.value = true

  const response = await createDepositAccountService(form).catch(() => {
    $notify.error($t('create-deposit-accounts.failed'))
  })

  if (response?.data) {
    $notify.success($t('create-deposit-accounts.success'))
    emit('reload')
  }

  isCreatingWithdrawal.value = false
}
</script>

<template>
  <DepositAccountForm
    :is-loading="isCreatingWithdrawal"
    @submit="createDepositAccount"
  />
</template>

<style scoped></style>
