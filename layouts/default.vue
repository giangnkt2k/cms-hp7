<script lang="ts" setup>
const route = useRoute()
const { $t } = useNuxtApp()
const { isAuthenticated, logout } = useAuthentication()

const pageTitle = computed(() => $t(route.meta.pageTitle || 'home.page.title'))

useHead({
  title: pageTitle
})
useDark()
</script>

<template>
  <el-container class="h-screen">
    <el-header
      v-if="isAuthenticated"
      class="border-b border-[var(--el-border-color)] flex items-center"
    >
      <h1 class="text-xl font-medium">
        {{ $t(route.meta.pageTitle || 'home.page.title') }}
      </h1>
      <div class="flex-grow" />
      <el-button
        type="danger"
        round
        plain
        @click="logout"
      >
        {{ $t('header.logout-button.label') }}
      </el-button>
    </el-header>
    <el-container>
      <the-navigation-sidebar v-if="isAuthenticated" />
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
