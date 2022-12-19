<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { IMember } from '~~/types/member'

type Props = {
  modelValue: boolean
  member?: IMember
}

type Emits = {
  (event: 'update:model-value', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { required, sameAs } = useValidators()
const { resetUserWithdrawPasswordService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const form = reactive({
  password: '',
  confirmPassword: ''
})
const isUpdatingUser = ref(false)

const rules = computed(() => ({
  password: {
    required
  },
  confirmPassword: {
    sameAs: sameAs(form.password)
  }
}))

const updatePassword = async () => {
  isUpdatingUser.value = true

  if (props.member) {
    const response = await resetUserWithdrawPasswordService(props.member.id, form.password).catch(() => {
      //
    })

    if (response?.status === 200) {
      $notify.success($t('update-user.dialog.success', {
        username: props.member?.username
      }))

      emit('update:model-value', false)
    }
  }

  isUpdatingUser.value = false
}

const $v = useVuelidate(rules, form)
</script>

<template>
  <el-dialog :model-value="modelValue" destroy-on-close :title="$t('update-user.dialog.title')" @update:model-value="$emit('update:model-value', $event)">
    <el-form label-position="top" @submit.prevent="updatePassword">
      <el-form-item prop="password" :label="$t('create-user.form.password.label')" :error="$v.password.$errors[0]?.$message.toString()" :show-message="$v.password.$error">
        <el-input v-model="form.password" show-password @blur="$v.password.$touch" />
      </el-form-item>

      <el-form-item prop="confirmPassword" :label="$t('create-user.form.confirm-password.label')" :error="$v.confirmPassword.$errors[0]?.$message.toString()" :show-message="$v.confirmPassword.$error">
        <el-input v-model="form.confirmPassword" show-password @blur="$v.confirmPassword.$touch" />
      </el-form-item>

      <el-form-item>
        <el-button class="w-full" type="primary" :disabled="$v.$invalid" native-type="submit" :loading="isUpdatingUser">
          {{ $t('update-user.form.submit.label') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped></style>
