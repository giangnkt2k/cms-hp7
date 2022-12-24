<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('deposits&withdrawals')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // eslint-disable-next-line no-console
  console.log(tab, event)
}
</script>

<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="Deposits and withdrawals"
        name="deposits&withdrawals"
      >
        <deposit-and-withdrawals-config />
      </el-tab-pane>
      <el-tab-pane
        label="Transactions/Rates"
        name="transactions/rates"
      >
        <transactions-rate-config />
      </el-tab-pane>
      <el-tab-pane
        label="Trading hours"
        name="tradingHours"
      >
        <trading-hour-config />
      </el-tab-pane>
      <el-tab-pane
        label="New shares"
        name="newShares"
      >
        <new-shares />
      </el-tab-pane>
      <el-tab-pane
        label="Online customer service"
        name="onlineCustomerService"
      >
        <online-customer-service />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
