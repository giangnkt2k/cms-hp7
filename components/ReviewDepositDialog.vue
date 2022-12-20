<script lang="ts" setup>
import { IDeposit } from '~~/types/deposit'

type Props = {
  modelValue: boolean
  deposit?: IDeposit
}

type Emits = {
  (event: 'update:model-value', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = reactive({
  status: props.deposit?.status,
  remarks: '',
  comments: ''
})

</script>

<template>
  <el-dialog
    :model-value="modelValue"
    destroy-on-close
    :title="$t('update-user.dialog.title')"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <el-form />
  </el-dialog>
</template>

<style scoped></style>
