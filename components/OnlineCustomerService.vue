<script lang="ts" setup>
const linkOnlineService = ref('')
const { systemConfigOnlineService, systemConfigDetailService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const onSubmit = async () => {
  const res = await systemConfigOnlineService(linkOnlineService.value)
  if (res.status === 200) {
    $notify.success($t('config.message.success'))
  } else {
    $notify.error($t('config.message.error'))
  }
}

const getOnlineService = async () => {
  const res = await systemConfigDetailService()
  const data = res.data.online_customer_service
  linkOnlineService.value = data
}
getOnlineService()
</script>

<template>
  <div>
    <el-form
      label-width="200px"
    >
      <el-form-item :label="$t('config.onlineService.online_customer_service')">
        <el-input v-model="linkOnlineService" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
