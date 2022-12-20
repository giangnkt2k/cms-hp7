<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

type Emits = {
  (event: 'reload'): void
}

const emit = defineEmits<Emits>()

const { required, sameAs, alphaNum } = useValidators()
const { createUserService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})
const isCreatingUser = ref(false)

const rules = computed(() => ({
  username: {
    required,
    alphaNum
  },
  password: {
    required
  },
  confirmPassword: {
    sameAs: sameAs(form.password)
  }
}))

const createUser = async () => {
  isCreatingUser.value = true
  const response = await createUserService(form.username, form.password).catch(() => {
    //
  })

  if (response?.status === 201) {
    $notify.success($t('create-user.dialog.success', {
      username: form.username
    }))

    emit('reload')
  }

  isCreatingUser.value = false
}

const $v = useVuelidate(rules, form)
</script>

<template>
  <el-form
    label-position="top"
    @submit.prevent="createUser"
  >
    <el-form-item
      prop="username"
      :label="$t('create-user.form.username.label')"
      :error="$v.username.$errors[0]?.$message.toString()"
      :show-message="$v.username.$error"
    >
      <el-input
        v-model="form.username"
        @blur="$v.username.$touch"
      />
    </el-form-item>

    <el-form-item
      prop="password"
      :label="$t('create-user.form.password.label')"
      :error="$v.password.$errors[0]?.$message.toString()"
      :show-message="$v.password.$error"
    >
      <el-input
        v-model="form.password"
        show-password
        @blur="$v.password.$touch"
      />
    </el-form-item>

    <el-form-item
      prop="confirmPassword"
      :label="$t('create-user.form.confirm-password.label')"
      :error="$v.confirmPassword.$errors[0]?.$message.toString()"
      :show-message="$v.confirmPassword.$error"
    >
      <el-input
        v-model="form.confirmPassword"
        show-password
        @blur="$v.confirmPassword.$touch"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        class="w-full"
        type="primary"
        :disabled="$v.$invalid"
        native-type="submit"
        :loading="isCreatingUser"
      >
        {{ $t('create-user.form.submit.label') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
