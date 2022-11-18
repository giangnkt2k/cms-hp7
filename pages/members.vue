<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'
import { IMember } from '~~/types/member'

definePageMeta({
  pageTitle: 'members.page.title'
})

const { appUserListService } = useApiServices()

const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const totalCount = ref(0)
const members = ref<IMember[]>([])

const getAppUsers = async () => {
  const response = await appUserListService({ page: currentPage.value, limit: pageSize.value })

  if (response?.data) {
    members.value = response.data.data
    totalCount.value = response.data.count
  }
}

getAppUsers()
</script>

<template>
  <app-table v-model:current-page="currentPage" v-model:page-size="pageSize" :data="members" :total="totalCount">
    <el-table-column prop="id" type="expand">
      <el-table :data="[]" border>
        <el-table-column label="Name" prop="name" />
        <el-table-column label="State" prop="state" />
        <el-table-column label="City" prop="city" />
        <el-table-column label="Address" prop="address" />
        <el-table-column label="Zip" prop="zip" />
      </el-table>
    </el-table-column>

    <el-table-column min-width="50" prop="id" :label="$t('members.table.headers.id')" />
    <el-table-column min-width="160" prop="agent_code" :label="$t('members.table.headers.agent-superior')">
      <template #default="scope">
        <div>{{ scope.row.agent_code || '-' }}</div>
        <div>{{ scope.row.superior || '-' }}</div>
      </template>
    </el-table-column>
    <el-table-column min-width="120" prop="phone" :label="$t('members.table.headers.phone')" />
    <el-table-column min-width="120" prop="balance" :label="$t('members.table.headers.balance')" />
    <el-table-column min-width="120" prop="balance_avail" :label="$t('members.table.headers.available')" />
    <el-table-column min-width="120" prop="balance_frozen" :label="$t('members.table.headers.freeze')" />
    <el-table-column min-width="120" prop="withdraw_avail" :label="$t('members.table.headers.withdrawable')" />
    <el-table-column min-width="120" prop="sell_amount_day" :label="$t('members.table.headers.today-income')" />
    <el-table-column min-width="120" prop="is_real" :label="$t('members.table.headers.is-real')" />
    <el-table-column min-width="150" prop="is_verified" :label="$t('members.table.headers.account-status')" />
    <el-table-column min-width="120" prop="ipo_application" :label="$t('members.table.headers.can-ipo')" />
    <el-table-column min-width="150" prop="is_playing_board" :label="$t('members.table.headers.is-playing-board')" />
    <el-table-column min-width="120" prop="last_login_ip" :label="$t('members.table.headers.last-login-ip')" />
    <el-table-column min-width="120" prop="created_by" :label="$t('members.table.headers.create-by')" />
    <el-table-column min-width="120" :label="$t('members.table.headers.actions')" />
  </app-table>
</template>

<style scoped></style>
