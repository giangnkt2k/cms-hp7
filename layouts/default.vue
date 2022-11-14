<script lang="ts" setup>
import { MetaObject } from '#app'

const route = useRoute()
const { t } = useUtility()

const computedHeader = computed<MetaObject>(() => ({
  title: t(route.meta.pageTitle || 'page.home.title')
}))

useHead(computedHeader)
</script>

<template>
  <el-container class="h-screen">
    <the-navigation-sidebar />
    <el-main>
      <slot />
    </el-main>
  </el-container>
</template>

<style scoped></style>
