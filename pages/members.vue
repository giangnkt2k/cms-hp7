<script lang="ts" setup>
import { TablePageSize } from '~~/types/app-table'

definePageMeta({
  pageTitle: 'members.page.title'
})

const { appUserListService } = useApiServices()

const currentPage = ref(1)
const pageSize = ref<TablePageSize>(100)
const totalCount = ref(1000)

appUserListService({ page: currentPage.value, limit: pageSize.value })
</script>

<template>
  <app-table v-model:current-page="currentPage" v-model:page-size="pageSize" :data="[]" :total="totalCount" />
</template>

<style scoped></style>
