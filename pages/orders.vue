<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'
import { IOrder } from '~~/types/transactions'

const { orderListService } = useApiServices()
const { readableTransactionType } = useTransaction()
const { dateFormatter } = useUtility()

const data = ref<IOrder[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const isLoading = ref(false)

const getTransactionList = async () => {
  isLoading.value = true
  const response = await orderListService(currentPage, pageSize)

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
          :label="$t('orders.table.id')"
        />

        <el-table-column
          min-width="90"
          prop="app_user"
          :label="$t('orders.table.real_name')"
        >
          <template #default="scope">
            <div>{{ scope.row.username || '-' }}</div>
            <div>{{ scope.row.real_name || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column
          min-width="80"
          prop="app_user"
          :label="$t('orders.table.actual_amount')"
        >
          <template #default="{row}">
            <div>{{ row.actual_amount|| '-' }}</div>
            <div>{{ row.actual_amount || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column
          min-width="50"
          prop="app_user"
          :label="$t('orders.table.type')"
        >
          <template #default="{row}">
            {{ readableTransactionType(row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="70"
          prop="user_id"
          :label="$t('orders.table.user_id')"
        />
        <el-table-column
          min-width="100"
          prop="username"
          :label="$t('orders.table.username')"
        />

        <el-table-column
          min-width="50"
          prop="amount"
          :label="$t('orders.table.amount')"
        >
          <template #default="{row}">
            {{ row.amount }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="70"
          prop="fee_rate"
          :label="$t('orders.table.fee_rate')"
        />

        <el-table-column
          min-width="70"
          prop="is_resolved"
          :label="$t('orders.table.is_resolved')"
        />

        <el-table-column
          min-width="100"
          prop="created_at"
          :label="$t('orders.table.created_at')"
        >
          <template #default="{row}">
            {{ dateFormatter(row.created_at, 'YYYY-MM-DD HH:mm:ss') || '-' }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          prop="remarks"
          :label="$t('orders.table.remarks')"
        />

        <el-table-column
          min-width="100"
          prop="stock_code"
          :label="$t('orders.table.stock_code')"
        />
        <el-table-column
          min-width="100"
          prop="stock_market"
          :label="$t('orders.table.stock_market')"
        />
        <el-table-column
          min-width="100"
          prop="stock_name"
          :label="$t('orders.table.stock_name')"
        />
        <el-table-column
          min-width="100"
          prop="trading_session"
          :label="$t('orders.table.trading_session')"
        />
        <el-table-column
          min-width="100"
          prop="zhangting"
          :label="$t('orders.table.zhangting')"
        />
        <el-table-column
          min-width="100"
          prop="updated_at"
          :label="$t('orders.table.updated_at')"
        />
      </AppTable>
    </el-card>
  </div>
</template>

<style scoped></style>
