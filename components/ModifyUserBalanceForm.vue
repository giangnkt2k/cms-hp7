<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { BalanceModifierType, IMember, ModifyUserBalanceBodyRequest } from '~~/types/member'

type Props = {
  member?: IMember
}

type Emits = {
  (event: 'reload'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { required, numeric } = useValidators()
const { $notify, $t } = useNuxtApp()
const { modifyUserBalanceService } = useApiServices()

const form = reactive<ModifyUserBalanceBodyRequest>({
  amount: 0,
  type: BalanceModifierType.INCREASE,
  comments: '',
  remarks: ''
})
const isUpdatingUser = ref(false)

const balanceModifierTypes = computed(() => [
  {
    text: $t('modify-user-balance.type.increase'),
    value: BalanceModifierType.INCREASE
  },
  {
    text: $t('modify-user-balance.type.decrease'),
    value: BalanceModifierType.DECREASE
  }
])
const rules = computed(() => ({
  amount: {
    required,
    numeric
  },
  type: {
    required
  },
  comments: {},
  remarks: {}
}))

const modifyBalance = async () => {
  if (props.member) {
    isUpdatingUser.value = true
    const response = await modifyUserBalanceService(props.member.id, form).catch(() => {
      $notify.error($t('modify-user-balance.failed'))
    }).finally(() => {
      isUpdatingUser.value = false
    })

    if (response?.data) {
      $notify.success($t('modify-user-balance.success'))
      emit('reload')
    }
  }
}

const $v = useVuelidate(rules, form)
</script>

<template>
  <el-form
    label-position="top"
    @submit.prevent="modifyBalance"
  >
    <el-form-item
      prop="type"
      :label="$t('modify-user-balance.type.label')"
      :error="$v.type.$errors[0]?.$message.toString()"
      :show-message="$v.type.$error"
    >
      <el-select v-model="form.type">
        <el-option
          v-for="item in balanceModifierTypes"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item
      prop="amount"
      :label="$t('modify-user-balance.amount.label')"
      :error="$v.amount.$errors[0]?.$message.toString()"
      :show-message="$v.amount.$error"
    >
      <el-input-number
        v-model="form.amount"
        :min="0"
        @blur="$v.amount.$touch"
      />
    </el-form-item>

    <el-form-item
      prop="comments"
      :label="$t('modify-user-balance.comments.label')"
      :error="$v.comments.$errors[0]?.$message.toString()"
      :show-message="$v.comments.$error"
    >
      <el-input
        v-model="form.comments"
        :placeholder="$t('modify-user-balance.comments.note')"
        @blur="$v.comments.$touch"
      />
    </el-form-item>

    <el-form-item
      prop="remark"
      :label="$t('modify-user-balance.remark.label')"
      :error="$v.remarks.$errors[0]?.$message.toString()"
      :show-message="$v.remarks.$error"
    >
      <el-input
        v-model="form.remarks"
        :placeholder="$t('modify-user-balance.remark.note')"
        @blur="$v.remarks.$touch"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        class="w-full"
        type="primary"
        :disabled="$v.$invalid"
        native-type="submit"
        :loading="isUpdatingUser"
      >
        {{ $t('modify-user-balance.submit.label') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
