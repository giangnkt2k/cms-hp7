<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { DEPOSIT_STATUS, IDeposit } from '~~/types/deposit'

type Props = {
  deposit?: IDeposit
}

type Emits = {
  (event: 'reload'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { depositStatuses } = useDeposit()
const { required } = useValidators()
const { reviewDepositService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const isLoading = ref(false)

const form = reactive({
  status: props.deposit?.status || DEPOSIT_STATUS.PENDING,
  remarks: props.deposit?.remarks || '',
  comments: props.deposit?.comments || ''
})

const rules = computed(() => ({
  status: {
    required
  }
}))

const $v = useVuelidate(rules, form)

const reviewDeposit = async () => {
  isLoading.value = true
  if (props.deposit) {
    const response = await reviewDepositService(props.deposit.id, form)

    if (response?.data) {
      emit('reload')

      $notify.success($t('review-deposit.success'))
    }
  }
  isLoading.value = false
}

form.status = props.deposit?.status || DEPOSIT_STATUS.PENDING
form.remarks = props.deposit?.remarks || ''
form.comments = props.deposit?.comments || ''
</script>

<template>
  <el-form
    label-position="left"
    label-width="120"
    @submit.prevent="reviewDeposit"
  >
    <el-form-item
      :label="$t('review-deposit.form.username.label')"
    >
      <el-input
        :model-value="deposit?.app_user?.username"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.realname.label')"
    >
      <el-input
        :model-value="deposit?.app_user?.real_name"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.amount.label')"
    >
      <el-input
        :model-value="deposit?.amount"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.account-holder.label')"
    >
      <el-input
        :model-value="deposit?.app_user?.account_holder"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.bank-name.label')"
    >
      <el-input
        :model-value="deposit?.app_user?.bank_name"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.account-number.label')"
    >
      <el-input
        :model-value="deposit?.app_user?.bank_number"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.bank-branch.label')"
    >
      <el-input
        :model-value="deposit?.app_user?.bank_branch"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.status.label')"
      :error="$v.status.$errors[0]?.$message.toString()"
      :show-message="$v.status.$error"
    >
      <el-select
        v-model="form.status"
        @blur="$v.status.$touch"
      >
        <el-option
          v-for="(option, index) in depositStatuses"
          :key="index"
          :value="option.value"
          :label="option.text"
        />
      </el-select>
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.admin-notes.label')"
    >
      <el-input
        v-model="form.comments"
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-deposit.form.remarks.label')"
    >
      <el-input
        v-model="form.remarks"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        class="w-full"
        type="primary"
        :disabled="$v.$invalid"
        native-type="submit"
        :loading="isLoading"
      >
        {{ $t('review-deposit.form.submit.label') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
