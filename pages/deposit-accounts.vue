<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'
import { IDepositAccount } from '~~/types/deposit-accounts'

definePageMeta({
  pageTitle: 'deposit-accounts.page.title'
})

const { depositAccountListService } = useApiServices()
const { dateFormatter } = useUtility()
const { $t } = useNuxtApp()

const data = ref<IDepositAccount[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const isLoading = ref(false)
const isCreateDepositAccountVisible = ref(false)
const isUpdateDepositAccountVisible = ref(false)
const selectedDepositAccount = ref<IDepositAccount>()

const getDepositAccounts = async () => {
  const response = await depositAccountListService(currentPage.value, pageSize.value)

  if (response?.data) {
    data.value = response.data.data
    total.value = response.data.count
  }
}

const startEditDepositAccount = (depositAccount: IDepositAccount) => {
  selectedDepositAccount.value = depositAccount
  isUpdateDepositAccountVisible.value = true
}

getDepositAccounts()
</script>

<template>
  <div>
    <div class="text-right">
      <el-button
        type="success"
        @click="isCreateDepositAccountVisible = true"
      >
        {{ $t('deposit-accounts.buttons.create.label') }}
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
          :label="$t('deposit-accounts.table.headers.id')"
        />
        <el-table-column
          min-width="100"
          prop="bank_name"
          :label="$t('deposit-accounts.table.headers.bank')"
        />
        <el-table-column
          min-width="100"
          prop="account_number"
          :label="$t('deposit-accounts.table.headers.account-number')"
        />
        <el-table-column
          min-width="100"
          prop="account_holder"
          :label="$t('deposit-accounts.table.headers.account-holder')"
        />
        <el-table-column
          min-width="100"
          prop="branch"
          :label="$t('deposit-accounts.table.headers.branch')"
        />

        <el-table-column
          min-width="140"
          prop="created_at"
          :label="$t('deposit-accounts.table.headers.created-at')"
        >
          <template #default="{row}">
            {{ dateFormatter(row.created_at, 'YYYY-MM-DD HH:mm:ss') || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          prop="is_enabled"
          :label="$t('deposit-accounts.table.headers.is_enabled')"
        >
          <template #default="{row}">
            {{ row.is_enabled ? 'Yes': 'No' }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="100"
          prop="is_public"
          :label="$t('deposit-accounts.table.headers.is_public')"
        >
          <template #default="{row}">
            {{ row.is_public ? 'Yes': 'No' }}
          </template>
        </el-table-column>

        <el-table-column
          width="80"
          :label="$t('deposit-accounts.table.headers.actions')"
          fixed="right"
        >
          <template #default="{row}">
            <div class="flex">
              <el-button
                type="primary"
                @click="startEditDepositAccount(row)"
              >
                {{ $t('deposit-accounts.table.headers.actions.edit') }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </AppTable>
    </el-card>

    <!-- Create User -->
    <AppDialog
      v-model="isCreateDepositAccountVisible"
      :title="$t('create-deposit-accounts.dialog.title')"
    >
      <CreateDepositAccountForm @reload="isCreateDepositAccountVisible = false; getDepositAccounts()" />
    </AppDialog>

    <!-- Update User -->
    <AppDialog
      v-model="isUpdateDepositAccountVisible"
      :title="$t('update-deposit-accounts.dialog.title')"
    >
      <UpdateDepositAccountForm
        v-if="selectedDepositAccount"
        :deposit-account="selectedDepositAccount"
        @reload="isUpdateDepositAccountVisible = false; getDepositAccounts()"
      />
    </AppDialog>
  </div>
</template>

<style scoped></style>
