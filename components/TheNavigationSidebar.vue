<script lang="ts" setup>
const navigationItems = useNavigationItems()
const route = useRoute()
const defaultActive = route.meta.pageRouteName
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu class="h-screen" router :default-active="defaultActive">
        <NavigationBarSubItem v-for="(item, index) in navigationItems" :key="index" :item="item" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped></style>
