<script lang="ts" setup>
import { INewShares } from '~~/types/configDandW'
const { systemConfigNewShareService, systemConfigDetailService } = useApiServices()
const { $notify, $t } = useNuxtApp()

const form = reactive <INewShares>({
  date_new_share: 0,
  ipo_signed_on_purchased: 0,
  ipo_shenzhen: 0,
  ipo_beijing: 0,
  ipo_app_min: 0,
  ipo_app_max: 0,
  hit_new_min_deposit_require: false,
  hit_new_min_deposit_amount: 0,
  multi_app: false,
  sufficient_available: false
})
const onSubmit = async () => {
  const res = await systemConfigNewShareService({
    date_new_share: Number(form.date_new_share),
    ipo_signed_on_purchased: Number(form.ipo_signed_on_purchased),
    ipo_shenzhen: Number(form.ipo_shenzhen),
    ipo_beijing: Number(form.ipo_beijing),
    ipo_app_min: Number(form.ipo_app_min),
    ipo_app_max: Number(form.ipo_app_max),
    hit_new_min_deposit_require: form.hit_new_min_deposit_require,
    hit_new_min_deposit_amount: Number(form.hit_new_min_deposit_amount),
    multi_app: form.multi_app,
    sufficient_available: form.sufficient_available
  })
  if (res.status === 200) {
    $notify.success($t('config.message.success'))
  } else {
    $notify.error($t('config.message.error'))
  }
}

const getConfigNewShare = async () => {
  const res = await systemConfigDetailService()
  const data = res.data.new_shares
  form.date_new_share = data.date_new_share
  form.ipo_signed_on_purchased = data.ipo_signed_on_purchased
  form.ipo_shenzhen = data.ipo_shenzhen
  form.ipo_beijing = data.ipo_beijing
  form.ipo_app_min = data.ipo_app_min
  form.ipo_app_max = data.ipo_app_max
  form.hit_new_min_deposit_require = data.hit_new_min_deposit_require
  form.hit_new_min_deposit_amount = data.hit_new_min_deposit_amount
  form.multi_app = data.multi_app
  form.sufficient_available = data.sufficient_available
}

getConfigNewShare()
</script>

<template>
  <div>
    <el-form
      :model="form"
      label-width="200px"
    >
      <el-form-item :label="$t('config.newShares.date_new_share')">
        <el-input v-model="form.date_new_share" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.ipo_signed_on_purchased')">
        <el-input v-model="form.ipo_signed_on_purchased" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.ipo_shenzhen')">
        <el-input v-model="form.ipo_shenzhen" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.ipo_beijing')">
        <el-input v-model="form.ipo_beijing" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.ipo_app_min')">
        <el-input v-model="form.ipo_app_min" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.ipo_app_max')">
        <el-input v-model="form.ipo_app_max" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.hit_new_min_deposit_require')">
        <el-switch v-model="form.hit_new_min_deposit_require" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.hit_new_min_deposit_amount')">
        <el-input v-model="form.hit_new_min_deposit_amount" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.multi_app')">
        <el-switch v-model="form.multi_app" />
      </el-form-item>
      <el-form-item :label="$t('config.newShares.sufficient_available')">
        <el-switch v-model="form.sufficient_available" />
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
