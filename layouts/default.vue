<script lang="ts" setup>
import { MetaObject } from '#app'

const route = useRoute()
const { t } = useUtility()
useDark()

const computedHeader = computed<MetaObject>(() => ({
  title: t(route.meta.pageTitle || 'home.page.title')
}))

useHead(computedHeader)
</script>

<template>
  <el-container class="h-screen">
    <el-header class="border-b border-[var(--el-border-color)] flex items-center">
      <h1 class="text-xl font-medium">
        {{ computedHeader.title }}
      </h1>
    </el-header>
    <el-container>
      <the-navigation-sidebar />
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
