<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'

definePageMeta({
  pageTitle: 'deposit.page.title'
})

const { getDepositsService } = useApiServices()

const data = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const isLoading = ref(false)

getDepositsService()
</script>

<template>
  <div>
    <div class="text-right">
      <el-button type="success">
        {{ $t('deposit.buttons.create.label') }}
      </el-button>
    </div>
    <el-card class="mt-4" body-style="padding: 0">
      <AppTable :data="data" :total="total" :current-page="currentPage" :page-size="pageSize" :is-loading="isLoading" />
    </el-card>
  </div>
</template>

<style scoped></style>
