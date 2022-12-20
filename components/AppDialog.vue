<script lang="ts" setup>
type Props = {
  modelValue: boolean
  title?: string
}

type Emits = {
  (event: 'update:model-value', value: boolean): void,
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <el-dialog
    :model-value="modelValue"
    destroy-on-close
    :title="title"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <slot />
  </el-dialog>
</template>
