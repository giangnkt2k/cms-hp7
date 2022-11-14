<script lang="ts" setup>
const navigationItems = useNavigationItems()
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <el-menu class="h-screen">
        <NavigationBarSubItem v-for="(item, index) in navigationItems" :key="index" :item="item" />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped></style>
