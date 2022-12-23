<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'
import { ITransaction } from '~~/types/transactions'

const { transactionListService } = useApiServices()
const { readableTransactionType, getComments, getremark } = useTransaction()
const { dateFormatter } = useUtility()

const data = ref<ITransaction[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const isLoading = ref(false)

const getTransactionList = async () => {
  isLoading.value = true
  const response = await transactionListService(currentPage, pageSize)

  if (response?.data) {
    data.value = response.data.data
    total.value = response.data.count
  }
  isLoading.value = false
}

getTransactionList()
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
          :label="$t('transactions.table.headers.id')"
        />

        <el-table-column
          min-width="90"
          prop="app_user"
          :label="$t('transactions.table.headers.username-realname')"
        >
          <template #default="scope">
            <div>{{ scope.row.app_user?.username || '-' }}</div>
            <div>{{ scope.row.app_user?.real_name || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column
          min-width="80"
          prop="app_user"
          :label="$t('transactions.table.headers.agent')"
        >
          <template #default="{row}">
            <div>{{ row.app_user?.created_by?.username || '-' }}</div>
            <div>{{ row.app_user?.created_by?.agent?.name || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column
          min-width="50"
          prop="app_user"
          :label="$t('transactions.table.headers.type')"
        >
          <template #default="{row}">
            {{ readableTransactionType(row.type) }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="50"
          prop="amount"
          :label="$t('transactions.table.headers.amount')"
        >
          <template #default="{row}">
            {{ row.after - row.before }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="70"
          prop="before"
          :label="$t('transactions.table.headers.before')"
        />

        <el-table-column
          min-width="70"
          prop="after"
          :label="$t('transactions.table.headers.after')"
        />

        <el-table-column
          min-width="100"
          prop="created_at"
          :label="$t('transactions.table.headers.created-at')"
        >
          <template #default="{row}">
            {{ dateFormatter(row.created_at, 'YYYY-MM-DD HH:mm:ss') || '-' }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          prop="created_at"
          :label="$t('transactions.table.headers.remark')"
        >
          <template #default="{row}">
            {{ getremark(row) || '-' }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          prop="created_at"
          :label="$t('transactions.table.headers.comments')"
        >
          <template #default="{row}">
            {{ getComments(row) || '-' }}
          </template>
        </el-table-column>
      </AppTable>
    </el-card>
  </div>
</template>

<style scoped></style>
