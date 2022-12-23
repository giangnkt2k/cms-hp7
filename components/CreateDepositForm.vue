<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { IMember } from '~~/types/member'

type FormFields = {
  selectedUserId: number | undefined,
  amount: number
}

type Emits = {
  (event: 'reload'): void
}

const emit = defineEmits<Emits>()

const { $notify, $t } = useNuxtApp()
const { appUserListService, createDepositService } = useApiServices()
const { required } = useValidators()

const isLoading = ref(false)
const users = ref<IMember[]>([])
const isCreatingDeposit = ref(false)

const form = reactive<FormFields>({
  selectedUserId: undefined,
  amount: 0
})

const rules = computed(() => ({
  selectedUserId: {
    required
  },
  amount: {
    required
  }
}))

const v$ = useVuelidate(rules, form)

const searchUser = async (keyword: string) => {
  if (keyword) {
    isLoading.value = true
    const response = await appUserListService({ page: 1, pageSize: 100, keyword })

    if (response?.data) {
      users.value = response.data.data
    }
    isLoading.value = false
  }
}

const createDeposit = async () => {
  if (form.selectedUserId) {
    isCreatingDeposit.value = true

    const response = await createDepositService({ user_id: form.selectedUserId, amount: form.amount }).catch(() => {
      $notify.success($t('create-deposit.failed'))
    })

    if (response?.data) {
      emit('reload')
      $notify.success($t('create-deposit.success'))
    }

    isCreatingDeposit.value = false
  }
}
</script>

<template>
  <el-form
    label-width="180"
    @submit.prevent="createDeposit"
  >
    <el-form-item
      prop="selectedUserId"
      :label="$t('create-deposit.user.label')"
      :error="v$.selectedUserId.$errors[0]?.$message.toString()"
      :show-message="v$.selectedUserId.$error"
    >
      <el-select
        v-model="form.selectedUserId"
        filterable
        remote
        reserve-keyword
        :placeholder="$t('create-deposit.user.placeholder')"
        :remote-method="searchUser"
        :loading="isLoading"
        @blur="v$.selectedUserId.$touch"
      >
        <el-option
          v-for="user in users"
          :key="user.id"
          :label="`${user.username}/${user.real_name}`"
          :value="user.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      prop="amount"
      :label="$t('create-deposit.amount.label')"
      :error="v$.amount.$errors[0]?.$message.toString()"
      :show-message="v$.amount.$error"
    >
      <el-input-number
        v-model.number="form.amount"
        @blur="v$.amount.$touch"
      />
    </el-form-item>

    <el-form-item label-width="0">
      <el-button
        class="w-full"
        type="primary"
        :disabled="v$.$invalid"
        native-type="submit"
        :loading="isCreatingDeposit"
      >
        {{ $t('create-deposit.submit.label') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
