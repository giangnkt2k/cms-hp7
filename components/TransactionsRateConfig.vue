<script lang="ts" setup>
import { ITransactionsRate } from '~~/types/configDandW'

const { systemConfigTransactionsRateService, systemConfigDetailService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const form = reactive <ITransactionsRate>({
  transaction_fees: 0,
  withdrawal_fees: 0,
  min_trans_balance: 0
})

const onSubmit = async () => {
  const res = await systemConfigTransactionsRateService({
    transaction_fees: Number(form.transaction_fees),
    withdrawal_fees: Number(form.withdrawal_fees),
    min_trans_balance: Number(form.min_trans_balance)
  })
  if (res.status === 200) {
    $notify.success($t('config.message.success'))
  } else {
    $notify.error($t('config.message.error'))
  }
}

const getConfigTransactionRate = async () => {
  const res = await systemConfigDetailService()
  const data = res.data.transactions_rate
  form.transaction_fees = data.transaction_fees
  form.withdrawal_fees = data.withdrawal_fees
  form.min_trans_balance = data.min_trans_balance
}
getConfigTransactionRate()
</script>

<template>
  <div>
    <el-form
      :model="form"
      label-width="120px"
    >
      <el-form-item :label="$t('config.transactionRate.transaction_fees')">
        <el-input v-model="form.transaction_fees" />
      </el-form-item>
      <el-form-item :label="$t('config.transactionRate.withdrawal_fees')">
        <el-input v-model="form.withdrawal_fees" />
      </el-form-item>
      <el-form-item :label="$t('config.transactionRate.min_trans_balance')">
        <el-input v-model="form.min_trans_balance" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
