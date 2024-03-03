<template>
  <div class="defaultLayout">
    <TabBar />
    <div class="sidebar">
      <router-view name="sidebar"></router-view>
    </div>
    <main>
      <router-view class="main"></router-view>
    </main>
    <ToastrModal />
  </div>
</template>
<script setup lang="ts">
import TabBar from 'widgets/TabBar';
import ToastrModal from 'shared/ui/toastrModel';
</script>
<style scoped lang="scss">
main {
  box-sizing: border-box;
  height: 100vh;
  flex: 1;
  padding: 60px 90px 0 90px;
  overflow-y: auto;
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
shared/ui/toastrModel
