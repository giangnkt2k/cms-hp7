<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { TablePageSize } from '~~/types/app-table'
import { IMember } from '~~/types/member'

definePageMeta({
  pageTitle: 'members.page.title'
})

const { appUserListService, deleteUserService, freezeUserService, unfreezeUserService } = useApiServices()
const { $notify, $message, $t } = useNuxtApp()
const { getFileUrl } = useUtility()
const { updateUserService } = useApiServices()

const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const totalCount = ref(0)
const members = ref<IMember[]>([])
const isCreateUserVisible = ref(false)
const isUpdateUserVisible = ref(false)
const selectedMember = ref<IMember>()
const isLoading = ref(false)
const isResetUserPasswordVisible = ref(false)
const isResetUserWithdrawPasswordVisible = ref(false)
const isModifyUserBalanceVisible = ref(false)

const getAppUsers = async (page?: number) => {
  isLoading.value = true
  if (page) {
    currentPage.value = page
  }
  const response = await appUserListService({ page: currentPage.value, pageSize: pageSize.value }).catch(() => {
    //
  })

  if (response?.data) {
    members.value = response.data.data
    totalCount.value = response.data.count
  }

  isLoading.value = false
}

const formatColumnValue = (_: unknown, __: unknown, value: unknown) => {
  return (value || '-') as string
}

const deleteUser = async (id: number) => {
  const response = await deleteUserService(id)
  if (response?.status === 200) {
    $notify.success($t('members.table.button.delete.success'))
    getAppUsers()
  }
}

const startUpdateUser = (member: IMember) => {
  selectedMember.value = member
  isUpdateUserVisible.value = true
}

const startResetUserPassword = (member: IMember) => {
  selectedMember.value = member
  isResetUserPasswordVisible.value = true
}

const startResetUserWithdrawPassword = (member: IMember) => {
  selectedMember.value = member
  isResetUserWithdrawPasswordVisible.value = true
}

const startLockingUser = (member: IMember) => {
  $message.confirm($t('members.lock-user.confirm-message')).then(async () => {
    const response = await freezeUserService(member.id)

    if (response?.status === 200) {
      $notify.success($t('members.lock-user.success'))
      getAppUsers()
    }
  })
}

const startModifyUserBalance = (member: IMember) => {
  selectedMember.value = member
  isModifyUserBalanceVisible.value = true
}

const startUnlockingUser = (member: IMember) => {
  $message.confirm($t('members.lock-user.confirm-message')).then(async () => {
    const response = await unfreezeUserService(member.id)

    if (response?.status === 200) {
      $notify.success($t('members.unlock-user.success'))
      getAppUsers()
    }
  })
}

const verifiedUser = (member: IMember) => {
  $message.confirm($t('members.verified-user.confirm-message')).then(async () => {
    const response = await updateUserService(member.id, { is_verified: true }).catch(() => {
      //
    })
    if (response?.status === 200) {
      $notify.success($t('update-user.dialog.success'))
      getAppUsers()
    }
  })
}

getAppUsers()
</script>

<template>
  <div>
    <div class="text-right">
      <el-button
        type="success"
        @click="isCreateUserVisible = true"
      >
        {{ $t('members.buttons.create.label') }}
      </el-button>
    </div>
    <el-card
      class="mt-4"
      body-style="padding: 0"
    >
      <AppTable
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :data="members"
        :total="totalCount"
        :is-loading="isLoading"
        @update:current-page="getAppUsers"
        @update:page-size="getAppUsers(1)"
      >
        <el-table-column
          prop="id"
          type="expand"
        >
          <template #default="{row}">
            <el-table
              :data="[row]"
              border
            >
              <el-table-column
                :label="$t('members.table.headers.real-name')"
                prop="real_name"
                :formatter="formatColumnValue"
              />
              <el-table-column
                :label="$t('members.table.headers.id-no')"
                prop="id_number"
                :formatter="formatColumnValue"
              />
              <el-table-column
                :label="$t('members.table.headers.id-front')"
                prop="id_front"
              >
                <template #default="{row: subRow}">
                  <el-image
                    class="w-100px aspect-video"
                    :src="getFileUrl(subRow.id_front)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('members.table.headers.id-back')"
                prop="id_back"
              >
                <template #default="{row: subRow}">
                  <el-image
                    class="w-100px aspect-video"
                    :src="getFileUrl(subRow.id_back)"
                  />
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('members.table.headers.bank-name')"
                prop="bank_name"
                :formatter="formatColumnValue"
              />
              <el-table-column
                :label="$t('members.table.headers.account-no')"
                prop="bank_number"
                :formatter="formatColumnValue"
              />
              <el-table-column
                :label="$t('members.table.headers.holder')"
                prop="account_holder"
                :formatter="formatColumnValue"
              />
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          min-width="50"
          prop="id"
          :label="$t('members.table.headers.id')"
        />
        <el-table-column
          min-width="160"
          prop="created_by"
          :label="$t('members.table.headers.agent-superior')"
        >
          <template #default="scope">
            <div>{{ scope.row.created_by?.username || '-' }}</div>
            <div>{{ scope.row.created_by?.agent?.name || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="160"
          prop="username"
          :label="$t('members.table.headers.username-real-name')"
        >
          <template #default="scope">
            <div>{{ scope.row.username || '-' }}</div>
            <div>{{ scope.row.real_name || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="phone"
          :label="$t('members.table.headers.phone')"
          :formatter="formatColumnValue"
        />
        <el-table-column
          min-width="120"
          prop="balance"
          :label="$t('members.table.headers.balance')"
        >
          <template #default="scope">
            <div>{{ scope.row.balance_avail + scope.row.balance_frozen || '-' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="balance_avail"
          :label="$t('members.table.headers.available')"
          :formatter="formatColumnValue"
        />
        <el-table-column
          min-width="120"
          prop="balance_frozen"
          :label="$t('members.table.headers.freeze')"
          :formatter="formatColumnValue"
        />
        <el-table-column
          min-width="120"
          :label="$t('members.table.headers.is-real')"
        >
          <template #default="{row}">
            {{ row.is_verified ? 'Yes' : 'No' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          :label="$t('members.table.headers.account-status')"
        >
          <template #default="{row}">
            {{ row.is_verified ? 'Verified' : 'Pending' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="can_ipo"
          :label="$t('members.table.headers.can-ipo')"
        >
          <template #default="{row}">
            {{ row.can_ipo ? 'Yes' : 'No' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          prop="is_playing_board"
          :label="$t('members.table.headers.is-playing-board')"
        >
          <template #default="{row}">
            {{ row.is_playing_board ? 'Yes' : 'No' }}
          </template>
        </el-table-column>
        <el-table-column
          min-width="120"
          prop="created_by.username"
          :label="$t('members.table.headers.create-by')"
          :formatter="formatColumnValue"
        />
        <el-table-column
          min-width="120"
          prop="approved_by.username"
          :label="$t('members.table.headers.approver')"
          :formatter="formatColumnValue"
        />
        <el-table-column
          min-width="200"
          :label="$t('members.table.headers.actions')"
          fixed="right"
        >
          <template #default="{row}">
            <el-dropdown>
              <el-button type="primary">
                {{ $t('members.buttons.edit.label') }}<el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="startUpdateUser(row)">
                    {{ $t('members.buttons.edit.label') }}
                  </el-dropdown-item>

                  <el-dropdown-item @click="startResetUserPassword(row)">
                    {{ $t('members.buttons.reset-password.label') }}
                  </el-dropdown-item>

                  <el-dropdown-item @click="startResetUserWithdrawPassword(row)">
                    {{ $t('members.buttons.reset-withdraw-password.label') }}
                  </el-dropdown-item>

                  <el-dropdown-item @click="startModifyUserBalance(row)">
                    {{ $t('members.buttons.modify-balance.label') }}
                  </el-dropdown-item>

                  <el-dropdown-item @click="verifiedUser(row)">
                    {{ $t('members.buttons.verified.label') }}
                  </el-dropdown-item>

                  <el-divider class="!my-1" />

                  <el-dropdown-item
                    v-if="!row.is_freeze"
                    @click="startLockingUser(row)"
                  >
                    {{ $t('members.buttons.lock-account.label') }}
                  </el-dropdown-item>

                  <el-dropdown-item
                    v-if="row.is_freeze"
                    @click="startUnlockingUser(row)"
                  >
                    {{ $t('members.buttons.unlock-account.label') }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-popconfirm
              :width="300"
              :confirm-button-text="$t('confirmation.yes-label')"
              :cancel-button-text="$t('confirmation.no-label')"
              :title="$t('members.table.button.delete.confirm')"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  class="ml-2"
                >
                  {{ $t('members.buttons.delete.label') }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </AppTable>
    </el-card>

    <!-- Create user -->
    <AppDialog
      v-model="isCreateUserVisible"
      :title="$t('create-user.dialog.title')"
    >
      <CreateUserForm
        @reload="isCreateUserVisible = false; getAppUsers(currentPage)"
      />
    </AppDialog>

    <!-- Update user -->
    <AppDialog
      v-model="isUpdateUserVisible"
      :title="$t('update-user.dialog.title')"
    >
      <UpdateUserForm
        :member="selectedMember"
        @reload="isUpdateUserVisible = false; getAppUsers(currentPage)"
      />
    </AppDialog>

    <!-- Reset user password -->
    <AppDialog
      v-model="isResetUserPasswordVisible"
      :title="$t('update-user.dialog.title')"
    >
      <ResetUserPasswordForm
        :member="selectedMember"
        @reload="isResetUserPasswordVisible = false"
      />
    </AppDialog>

    <!-- Reset user withdraw password -->
    <AppDialog
      v-model="isResetUserWithdrawPasswordVisible"
      :title="$t('update-user.dialog.title')"
    >
      <ResetUserWithdrawPasswordForm
        :member="selectedMember"
        @reload="isResetUserWithdrawPasswordVisible = false"
      />
    </AppDialog>

    <!-- Modify user balance -->
    <AppDialog
      v-model="isModifyUserBalanceVisible"
      :title="$t('modify-user-balance.dialog.title')"
    >
      <ModifyUserBalanceForm
        :member="selectedMember"
        @reload="isModifyUserBalanceVisible = false; getAppUsers(currentPage)"
      />
    </AppDialog>
  </div>
</template>

<style scoped></style>
