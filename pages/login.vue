<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'

definePageMeta({
  pageTitle: 'login.page.title'
})

const { $typedRouter, $routesList } = useNuxtApp()
const { required } = useValidators()
const { loginService } = useApiServices()
const { accessToken } = useAuthentication()

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: {
    required
  },
  password: {
    required
  }
}

const isLoggingIn = ref(false)

const login = async () => {
  isLoggingIn.value = true
  const response = await loginService(form.username, form.password).catch(() => {
    // TODO
  })

  if (response?.data) {
    accessToken.value = response.data.access_token
    await $typedRouter.push({ name: $routesList.index })
  }
  isLoggingIn.value = false
}

const $v = useVuelidate(rules, form)
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <el-card class="max-w-320px w-full">
      <el-form
        label-position="top"
        @submit.prevent="login"
      >
        <el-form-item
          prop="username"
          :label="$t('login.form.username.label')"
          :error="$v.username.$errors[0]?.$message"
          :show-message="$v.username.$error"
        >
          <el-input
            v-model="form.username"
            @blur="$v.username.$touch"
          />
        </el-form-item>

        <el-form-item
          prop="password"
          :label="$t('login.form.password.label')"
          :error="$v.password.$errors[0]?.$message"
          :show-message="$v.password.$error"
        >
          <el-input
            v-model="form.password"
            show-password
            @blur="$v.password.$touch"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            class="w-full"
            type="primary"
            :disabled="$v.$invalid"
            native-type="submit"
            :loading="isLoggingIn"
          >
            {{ $t('login.form.submit.label') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped></style>
