<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'
import { DEPOSIT_STATUS, IDeposit } from '~~/types/deposit'

definePageMeta({
  pageTitle: 'deposit.page.title'
})

const { getDepositsService } = useApiServices()
const { dateFormatter } = useUtility()
const { readableDepositStatus } = useDeposit()

const data = ref<IDeposit[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const isLoading = ref(false)
const isReviewDepositVisible = ref(false)
const selectedDeposit = ref<IDeposit>()

const getDeposits = async () => {
  const response = await getDepositsService(currentPage.value, pageSize.value)

  if (response?.data) {
    data.value = response.data.data
    total.value = response.data.count
  }
}

const startReviewDeposit = (data: IDeposit) => {
  selectedDeposit.value = data

  isReviewDepositVisible.value = true
}

getDeposits()
</script>

<template>
  <div>
    <div class="text-right">
      <el-button type="success">
        {{ $t('deposit.buttons.create.label') }}
      </el-button>
    </div>
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
          :label="$t('deposit.table.headers.id')"
        />
        <el-table-column
          min-width="100"
          prop="app_user"
          :label="$t('deposit.table.headers.username-realname')"
        >
          <template #default="{row}">
            <div>{{ row.app_user?.username || '-' }}</div>
            <div>{{ row.app_user?.real_name || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          prop="app_user.created_by"
          :label="$t('deposit.table.headers.agent-superior')"
        >
          <template #default="{row}">
            <div>{{ row.app_user?.created_by?.username || '-' }}</div>
            <div>{{ row.app_user?.created_by?.agent?.name || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="amount"
          :label="$t('deposit.table.headers.amount')"
        />
        <el-table-column
          min-width="100"
          prop="approved_by"
          :label="$t('deposit.table.headers.reviewer')"
        >
          <template #default="{row}">
            <div>{{ row.approved_by?.username || '-' }}</div>
            <div>{{ dateFormatter(row.reviewed_at, 'YYYY-MM-DD HH:mm:ss') || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="created_at"
          :label="$t('deposit.table.headers.created-at')"
        >
          <template #default="{row}">
            {{ dateFormatter(row.created_at, 'YYYY-MM-DD HH:mm:ss') || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="remarks"
          :label="$t('deposit.table.headers.remarks')"
        />
        <el-table-column
          min-width="100"
          prop="comments"
          :label="$t('deposit.table.headers.notes')"
        />
        <el-table-column
          min-width="100"
          prop="status"
          :label="$t('deposit.table.headers.status')"
        >
          <template #default="{row}">
            {{ readableDepositStatus(row.status) }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          :label="$t('members.table.headers.actions')"
          fixed="right"
        >
          <template #default="{row}">
            <el-button
              v-if="row.status !== DEPOSIT_STATUS.APPROVED"
              type="primary"
              @click="startReviewDeposit(row)"
            >
              {{ $t('members.table.actions.review') }}
            </el-button>
          </template>
        </el-table-column>
      </AppTable>
    </el-card>

    <AppDialog
      v-model="isReviewDepositVisible"
      :title="$t('review-deposit.dialog.title')"
    >
      <ReviewDepositForm
        :deposit="selectedDeposit"
        @reload="isReviewDepositVisible = false; getDeposits()"
      />
    </AppDialog>
  </div>
</template>

<style scoped></style>
