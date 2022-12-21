<script lang="ts" setup>
// eslint-disable-next-line import/named
import { useVuelidate, ValidationArgs } from '@vuelidate/core'
import { CreateDepositAccountBody, IDepositAccount } from '~~/types/deposit-accounts'

type Props = {
  depositAccount?: IDepositAccount
  isLoading?: boolean
}

type Emits = {
  (event:'submit', payload: CreateDepositAccountBody): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { required } = useValidators()

const form = reactive<CreateDepositAccountBody>({
  account_holder: '',
  account_number: '',
  bank_name: '',
  branch: '',
  is_enabled: true,
  is_public: true
})

const rules = computed<ValidationArgs<Omit<CreateDepositAccountBody, 'is_enabled' | 'is_public'>>>(() => ({
  account_holder: {
    required
  },
  account_number: {
    required
  },
  bank_name: {
    required
  },
  branch: {
    required
  }
}))

const validator = useVuelidate(rules, form)

const submitForm = () => {
  emit('submit', form)
}

onMounted(() => {
  if (props.depositAccount) {
    form.account_holder = props.depositAccount.account_holder
    form.account_number = props.depositAccount.account_number
    form.bank_name = props.depositAccount.bank_name
    form.branch = props.depositAccount.branch
    form.is_enabled = props.depositAccount.is_enabled
    form.is_public = props.depositAccount.is_public
  }
})
</script>

<template>
  <el-form
    label-width="130"
    @submit.prevent="submitForm"
  >
    <el-form-item
      :label="$t('deposit-accounts.table.headers.bank')"
      :error="validator.bank_name.$errors[0]?.$message.toString()"
      :show-message="validator.bank_name.$error"
    >
      <el-input
        v-model="form.bank_name"
        @blur="validator.bank_name.$touch"
      />
    </el-form-item>

    <el-form-item
      :label="$t('deposit-accounts.table.headers.branch')"
      :error="validator.branch.$errors[0]?.$message.toString()"
      :show-message="validator.branch.$error"
    >
      <el-input
        v-model="form.branch"
        @blur="validator.branch.$touch"
      />
    </el-form-item>

    <el-form-item
      :label="$t('deposit-accounts.table.headers.account-number')"
      :error="validator.account_number.$errors[0]?.$message.toString()"
      :show-message="validator.account_number.$error"
    >
      <el-input
        v-model="form.account_number"
        @blur="validator.account_number.$touch"
      />
    </el-form-item>

    <el-form-item
      :label="$t('deposit-accounts.table.headers.account-holder')"
      :error="validator.account_holder.$errors[0]?.$message.toString()"
      :show-message="validator.account_holder.$error"
    >
      <el-input
        v-model="form.account_holder"
        @blur="validator.account_holder.$touch"
      />
    </el-form-item>

    <el-form-item
      :label="$t('deposit-accounts.table.headers.is_enabled')"
    >
      <el-switch
        v-model="form.is_enabled"
      />
    </el-form-item>

    <el-form-item
      :label="$t('deposit-accounts.table.headers.is_public')"
    >
      <el-switch
        v-model="form.is_public"
      />
    </el-form-item>

    <el-form-item label-width="0">
      <el-button
        class="w-full"
        type="primary"
        :disabled="validator.$invalid"
        native-type="submit"
        :loading="isLoading"
      >
        {{ $t('create-deposit-accounts.submit.label') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
