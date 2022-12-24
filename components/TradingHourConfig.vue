<script lang="ts" setup>
import { ITradingHours } from '~~/types/configDandW'

const { systemConfigTradingHoursService, systemConfigDetailService } = useApiServices()
const { timeFormatter } = useUtility()
const { $notify, $t } = useNuxtApp()

const formTradingHours = reactive<ITradingHours>({
  nor_start_mor: '',
  nor_end_mor: '',
  nor_start_aft: '',
  nor_end_aft: '',
  nor_trading: [],
  large_start_mor: '',
  large_end_mor: '',
  large_start_aft: '',
  large_end_aft: '',
  large_trading: []
})

const optionDays = [
  {
    value: 'monday',
    label: 'Monday'
  },
  {
    value: 'tuesday',
    label: 'Tuesday'
  },
  {
    value: 'wednesday',
    label: 'Wednesday'
  },
  {
    value: 'thursday',
    label: 'Thursday'
  },
  {
    value: 'friday',
    label: 'Friday'
  },
  {
    value: 'saturday',
    label: 'Saturday'
  },
  {
    value: 'sunday',
    label: 'Sunday'
  }
]

const onSubmit = async () => {
  const res = await systemConfigTradingHoursService({
    nor_start_mor: timeFormatter(formTradingHours.nor_start_mor),
    nor_end_mor: timeFormatter(formTradingHours.nor_end_mor),
    nor_start_aft: timeFormatter(formTradingHours.nor_start_aft),
    nor_end_aft: timeFormatter(formTradingHours.nor_end_aft),
    nor_trading: formTradingHours.nor_trading,
    large_start_mor: timeFormatter(formTradingHours.large_start_mor),
    large_end_mor: timeFormatter(formTradingHours.large_end_mor),
    large_start_aft: timeFormatter(formTradingHours.large_start_aft),
    large_end_aft: timeFormatter(formTradingHours.large_end_aft),
    large_trading: formTradingHours.large_trading
  })
  if (res.status === 200) {
    $notify.success($t('config.message.success'))
  } else {
    $notify.error($t('config.message.error'))
  }
}

const getConfigTradingHour = async () => {
  const res = await systemConfigDetailService()
  const data = res.data.trading_hours
  formTradingHours.nor_start_mor = timeFormatter(data.nor_start_mor)
  formTradingHours.nor_end_mor = timeFormatter(data.nor_end_mor)
  formTradingHours.nor_start_aft = timeFormatter(data.nor_start_aft)
  formTradingHours.nor_end_aft = timeFormatter(data.nor_end_aft)
  formTradingHours.nor_trading = data.nor_trading
  formTradingHours.large_start_mor = timeFormatter(data.large_start_mor)
  formTradingHours.large_end_mor = timeFormatter(data.large_end_mor)
  formTradingHours.large_start_aft = timeFormatter(data.large_start_aft)
  formTradingHours.large_end_aft = timeFormatter(data.large_end_aft)
  formTradingHours.large_trading = data.large_trading
}
getConfigTradingHour()
</script>

<template>
  <div>
    <div>Normal Trading</div>
    <br>
    <el-form
      label-width="200px"
    >
      <el-form-item :label="$t('config.tradingHour.start_in_the_morning')">
        <el-time-picker
          v-model="formTradingHours.nor_start_mor"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.end_of_the_morning')">
        <el-time-picker
          v-model="formTradingHours.nor_end_mor"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.start_in_the_afternoon')">
        <el-time-picker
          v-model="formTradingHours.nor_start_aft"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.end_of_the_afternoon')">
        <el-time-picker
          v-model="formTradingHours.nor_end_aft"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.trading')">
        <el-select
          v-model="formTradingHours.nor_trading"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
        >
          <el-option
            v-for="item in optionDays"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div>Large Trading</div>
      <br>
      <el-form-item :label="$t('config.tradingHour.start_in_the_morning')">
        <el-time-picker
          v-model="formTradingHours.large_start_mor"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.end_of_the_morning')">
        <el-time-picker
          v-model="formTradingHours.large_end_mor"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.start_in_the_afternoon')">
        <el-time-picker
          v-model="formTradingHours.large_start_aft"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.end_of_the_afternoon')">
        <el-time-picker
          v-model="formTradingHours.large_end_aft"
          type="date"
          placeholder="Pick time"
          size="large"
        />
      </el-form-item>
      <el-form-item :label="$t('config.tradingHour.trading')">
        <el-select
          v-model="formTradingHours.large_trading"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
        >
          <el-option
            v-for="item in optionDays"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>
