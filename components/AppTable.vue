<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'

type Props = {
  data: Record<string, unknown>[],
  total: number
  currentPage: number
  pageSize: TablePageSize
}

type Emits = {
  (event: 'update:current-page', value: number): void
  (event: 'update:page-size', value: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="w-full">
    <el-table :data="data">
      <slot />
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="$emit('update:page-size', $event)"
      @current-change="$emit('update:current-page', $event)"
    />
  </div>
</template>

<style scoped></style>
