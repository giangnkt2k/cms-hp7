<script lang="ts" setup>
import { IDepositsAndWithdrawals } from '~~/types/configDandW'

const { systemConfigService, systemConfigDetailService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const form = reactive <IDepositsAndWithdrawals>({
  deposit_min: 0,
  deposit_max: 0,
  withdrawal_min: 0,
  withdrawal_max: 0,
  deposit_permission: false,
  withdrawal_permission: false,
  institutional_code: 0,
  deposit_prompt: '',
  upload_deposit_voucher: false,
  transfer_account_detail: false,
  withdrawal_prompt: '',
  withdrawal_date_available: [],
  start_time: '',
  end_time: ''
})

const optionDays = [
  {
    value: 'monday',
    label: 'Monday'
  },
  {
    value: 'tuesday',
    label: 'Tuesday'
  },
  {
    value: 'wednesday',
    label: 'Wednesday'
  },
  {
    value: 'thursday',
    label: 'Thursday'
  },
  {
    value: 'friday',
    label: 'Friday'
  },
  {
    value: 'saturday',
    label: 'Saturday'
  },
  {
    value: 'sunday',
    label: 'Sunday'
  }
]

const onSubmit = async () => {
  const res = await systemConfigService({
    deposit_min: Number(form.deposit_min),
    deposit_max: Number(form.deposit_max),
    withdrawal_min: Number(form.withdrawal_min),
    withdrawal_max: Number(form.withdrawal_max),
    deposit_permission: form.deposit_permission,
    withdrawal_permission: form.withdrawal_permission,
    institutional_code: Number(form.institutional_code),
    deposit_prompt: form.deposit_prompt,
    upload_deposit_voucher: form.upload_deposit_voucher,
    transfer_account_detail: form.transfer_account_detail,
    withdrawal_prompt: form.withdrawal_prompt,
    withdrawal_date_available: form.withdrawal_date_available,
    start_time: form.start_time,
    end_time: form.end_time
  })
  if (res.status === 200) {
    $notify.success($t('config.message.success'))
  } else {
    $notify.error($t('config.message.error'))
  }
}

const getConfigDepositAndWithdrawal = async () => {
  const res = await systemConfigDetailService()
  const data = res.data.deposits_and_withdrawals
  form.deposit_min = data.deposit_min
  form.deposit_max = data.deposit_max
  form.withdrawal_min = data.withdrawal_min
  form.withdrawal_max = data.withdrawal_max
  form.deposit_permission = data.deposit_permission
  form.withdrawal_permission = data.withdrawal_permission
  form.institutional_code = data.institutional_code
  form.deposit_prompt = data.deposit_prompt
  form.upload_deposit_voucher = data.upload_deposit_voucher
  form.transfer_account_detail = data.transfer_account_detail
  form.withdrawal_prompt = data.withdrawal_prompt
  form.withdrawal_date_available = data.withdrawal_date_available
  form.start_time = data.start_time
  form.end_time = data.end_time
}
getConfigDepositAndWithdrawal()
</script>

<template>
  <div>
    <el-form
      :model="form"
      label-width="200px"
    >
      <el-form-item
        :label="$t('config.d&w.deposit_min')"
      >
        <el-input
          v-model="form.deposit_min"
          type="number"
        />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.deposit_max')">
        <el-input v-model="form.deposit_max" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.withdrawal_min')">
        <el-input v-model="form.withdrawal_min" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.withdrawal_max')">
        <el-input v-model="form.withdrawal_max" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.deposit_permission')">
        <el-switch v-model="form.deposit_permission" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.withdrawal_permission')">
        <el-switch v-model="form.withdrawal_permission" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.institutional_code')">
        <el-input v-model="form.institutional_code" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.deposit_prompt')">
        <el-input v-model="form.deposit_prompt" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.upload_deposit_voucher')">
        <el-switch v-model="form.upload_deposit_voucher" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.transfer_account_detail')">
        <el-switch v-model="form.transfer_account_detail" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.withdrawal_prompt')">
        <el-input v-model="form.withdrawal_prompt" />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.withdrawal_date_available')">
        <el-select
          v-model="form.withdrawal_date_available"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
        >
          <el-option
            v-for="item in optionDays"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('config.d&w.start_time')">
        <el-date-picker
          v-model="form.start_time"
          type="datetime"
          placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item :label="$t('config.d&w.end_time')">
        <el-date-picker
          v-model="form.end_time"
          type="datetime"
          placeholder="Select date and time"
        />
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
