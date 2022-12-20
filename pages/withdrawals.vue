<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'
import { DEPOSIT_STATUS } from '~~/types/deposit'
import { IWithdrawal } from '~~/types/withdrawals'

definePageMeta({
  pageTitle: 'withdrawals.page.title'
})

const { getWithdrawalsService } = useApiServices()
const { dateFormatter } = useUtility()
const { readableWithdrawalStatus } = useWithdrawal()

const data = ref<IWithdrawal[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const isLoading = ref(false)
const isReviewWithdrawalVisible = ref(false)
const selectedWithdrawal = ref<IWithdrawal>()

const getWithdrawals = async () => {
  const response = await getWithdrawalsService(currentPage.value, pageSize.value)

  if (response?.data) {
    data.value = response.data.data
    total.value = response.data.count
  }
}

const startReviewWithdrawal = (data: IWithdrawal) => {
  selectedWithdrawal.value = data

  isReviewWithdrawalVisible.value = true
}

getWithdrawals()
</script>

<template>
  <div>
    <el-card
      class="mt-4"
      body-style="padding: 0"
    >
      <AppTable
        :data="data"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :is-loading="isLoading"
      >
        <el-table-column
          min-width="50"
          prop="id"
          :label="$t('withdrawals.table.headers.id')"
        />
        <el-table-column
          min-width="100"
          prop="app_user"
          :label="$t('withdrawals.table.headers.username-realname')"
        >
          <template #default="{row}">
            <div>{{ row.app_user?.username || '-' }}</div>
            <div>{{ row.app_user?.real_name || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          prop="app_user.created_by"
          :label="$t('withdrawals.table.headers.agent-superior')"
        >
          <template #default="{row}">
            <div>{{ row.app_user?.created_by?.username || '-' }}</div>
            <div>{{ row.app_user?.created_by?.agent?.name || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="amount"
          :label="$t('withdrawals.table.headers.amount')"
        />
        <el-table-column
          min-width="100"
          prop="approved_by"
          :label="$t('withdrawals.table.headers.reviewer')"
        >
          <template #default="{row}">
            <div>{{ row.approved_by?.username || '-' }}</div>
            <div>{{ row.reviewed_at ? dateFormatter(row.reviewed_at, 'YYYY-MM-DD HH:mm:ss') : '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="created_at"
          :label="$t('withdrawals.table.headers.created-at')"
        >
          <template #default="{row}">
            {{ dateFormatter(row.created_at, 'YYYY-MM-DD HH:mm:ss') || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="remarks"
          :label="$t('withdrawals.table.headers.remarks')"
        />
        <el-table-column
          min-width="100"
          prop="comments"
          :label="$t('withdrawals.table.headers.notes')"
        />
        <el-table-column
          min-width="100"
          prop="status"
          :label="$t('withdrawals.table.headers.status')"
        >
          <template #default="{row}">
            {{ readableWithdrawalStatus(row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          :label="$t('withdrawals.table.headers.actions')"
          fixed="right"
        >
          <template #default="{row}">
            <el-button
              v-if="row.status !== DEPOSIT_STATUS.APPROVED"
              type="primary"
              @click="startReviewWithdrawal(row)"
            >
              {{ $t('withdrawals.table.actions.review') }}
            </el-button>
          </template>
        </el-table-column>
      </AppTable>
    </el-card>

    <AppDialog
      v-model="isReviewWithdrawalVisible"
      :title="$t('review-withdrawal.dialog.title')"
    />
  </div>
</template>

<style scoped></style>
