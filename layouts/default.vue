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
  <div
  >
    <slot />
  </div>
</template>

<style scoped></style>
