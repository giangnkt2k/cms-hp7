<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'

type Props = {
  data: Record<string, unknown>[];
  total: number;
  currentPage: number;
  pageSize: TablePageSize;
  isLoading?: boolean
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
    <el-table v-loading="isLoading" :data="data">
      <slot />
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <el-pagination
      hide-on-single-page
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="$emit('update:page-size', $event)"
      @current-change="$emit('update:current-page', $event)"
    />
  </div>
</template>

<style scoped></style>
