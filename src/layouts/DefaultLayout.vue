<template>
  <div class="defaultLayout">
    <TabBar />
    <div class="sidebar">
      <router-view name="sidebar"></router-view>
    </div>
    <main>
      <router-view class="main"></router-view>
    </main>
  </div>
</template>
<script setup lang="ts">
import TabBar from '@/components/TabBar.vue';
</script>
<style scoped lang="scss">
main {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  padding: 60px 90px 0 90px;
}
.defaultLayout {
  display: flex;
  box-sizing: border-box;
}
.sidebar {
  max-width: 360px;
  width: 100%;
  background-color: #fff;
  height: 100vh;
  border-right: 1px solid #f2f3f5;
  box-sizing: border-box;
  padding-top: 10px;
}
</style>
