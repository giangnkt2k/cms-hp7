<script lang="ts" setup>
import { INavigationItem } from '~~/types/layout'

defineProps<{
  item: INavigationItem
}>()
</script>

<template>
  <el-sub-menu v-if="!!item.child?.length" :index="item.id">
    <template #title>
      <span>{{ item.name }}</span>
    </template>

    <NavigationBarSubItem v-for="(childItem, index) in item.child" :key="index" :item="childItem" />
  </el-sub-menu>
  <el-menu-item v-else :route="item.route" :index="item.routeName">
    {{ item.name }}
  </el-menu-item>
</template>

<style scoped></style>
