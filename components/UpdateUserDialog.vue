<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { IMember } from '~~/types/member'

type Props = {
  modelValue: boolean,
  member?: IMember
}

type Emits = {
  (event: 'update:model-value', value: boolean): void
  (event: 'reload'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { required, numeric, alphaNum } = useValidators()
const { updateUserService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const form = reactive({
  realname: props.member?.real_name ?? '',
  phone: props.member?.phone ?? '',
  bankNumber: props.member?.bank_number ?? ''
})
const isUpdatingUser = ref(false)

const rules = computed(() => ({
  realname: {
    required
  },
  phone: {
    required,
    numeric
  },
  bankNumber: {
    required,
    alphaNum
  }
}))

const setMemberInfo = (member?: IMember) => {
  form.realname = member?.real_name ?? ''
  form.phone = member?.phone ?? ''
  form.bankNumber = member?.bank_number ?? ''
}

const updateUser = async () => {
  isUpdatingUser.value = true
  if (props.member) {
    const response = await updateUserService(props.member.id, { bank_number: form.bankNumber, phone: form.phone, real_name: form.realname || '' }).catch(() => {
      //
    })

    if (response?.status === 200) {
      $notify.success($t('update-user.dialog.success', {
        username: props.member.username
      }))

      emit('update:model-value', false)
      emit('reload')
    }
  }

  isUpdatingUser.value = false
}

const $v = useVuelidate(rules, form)

watch(() => props.member, (value) => {
  setMemberInfo(value)
})
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    destroy-on-close
    :title="$t('update-user.dialog.title')"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <el-form
      label-position="top"
      @submit.prevent="updateUser"
    >
      <el-form-item
        prop="realname"
        :label="$t('update-user.form.realname.label')"
        :error="$v.realname.$errors[0]?.$message.toString()"
        :show-message="$v.realname.$error"
      >
        <el-input
          v-model="form.realname"
          @blur="$v.realname.$touch"
        />
      </el-form-item>

      <el-form-item
        prop="phone"
        :label="$t('update-user.form.phone.label')"
        :error="$v.phone.$errors[0]?.$message.toString()"
        :show-message="$v.phone.$error"
      >
        <el-input
          v-model="form.phone"
          @blur="$v.phone.$touch"
        />
      </el-form-item>

      <el-form-item
        prop="bankNumber"
        :label="$t('update-user.form.bank-number.label')"
        :error="$v.bankNumber.$errors[0]?.$message.toString()"
        :show-message="$v.bankNumber.$error"
      >
        <el-input
          v-model="form.bankNumber"
          @blur="$v.bankNumber.$touch"
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
          {{ $t('update-user.form.submit.label') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped></style>
