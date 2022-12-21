<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { IWithdrawal, WITHDRAWAL_STATUS } from '~~/types/withdrawals'

type Props = {
  withdrawal?: IWithdrawal
}

type Emits = {
  (event: 'reload'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { $notify, $t } = useNuxtApp()
const { withdrawalStatuses } = useWithdrawal()
const { required } = useValidators()
const { reviewWithdrawalService } = useApiServices()

const isLoading = ref(false)

const form = reactive({
  status: props.withdrawal?.status ?? WITHDRAWAL_STATUS.PENDING,
  remarks: props.withdrawal?.remarks ?? '',
  comments: props.withdrawal?.comments ?? ''
})

const rules = computed(() => ({
  status: {
    required
  }
}))

const $v = useVuelidate(rules, form)

const reviewWithdrawal = async () => {
  isLoading.value = true

  if (props.withdrawal) {
    const response = await reviewWithdrawalService(props.withdrawal.id, {
      ...form
    }).catch(() => {
      $notify.error($t('review-withdrawal.failed'))
    })

    if (response?.data) {
      $notify.success($t('review-withdrawal.success'))
      emit('reload')
    }
  }

  isLoading.value = false
}
</script>

<template>
  <el-form
    v-if="withdrawal"
    label-width="100"
    @submit.prevent="reviewWithdrawal"
  >
    <el-form-item :label="$t('review-withdrawal.form.username')">
      <el-input
        :model-value="withdrawal.app_user.username"
        readonly
      />
    </el-form-item>

    <el-form-item :label="$t('review-withdrawal.form.real-name')">
      <el-input
        :model-value="withdrawal.app_user.real_name"
        readonly
      />
    </el-form-item>

    <el-form-item :label="$t('review-withdrawal.form.amount')">
      <el-input
        :model-value="withdrawal.amount"
        readonly
      />
    </el-form-item>

    <el-form-item
      :label="$t('review-withdrawal.form.status')"
      :error="$v.status.$errors[0]?.$message.toString()"
      :show-message="$v.status.$error"
    >
      <el-select
        v-model="form.status"
        @blur="$v.status.$touch"
      >
        <el-option
          v-for="(item, index) in withdrawalStatuses"
          :key="index"
          :value="item.value"
          :label="item.text"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('review-withdrawal.form.comments')">
      <el-input
        v-model="form.comments"
      />
    </el-form-item>

    <el-form-item :label="$t('review-withdrawal.form.remarks')">
      <el-input
        v-model="form.remarks"
      />
    </el-form-item>

    <el-form-item label-width="0">
      <el-button
        class="w-full"
        type="primary"
        :disabled="$v.$invalid"
        native-type="submit"
        :loading="isLoading"
      >
        {{ $t('review-withdrawal.form.submit.label') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
