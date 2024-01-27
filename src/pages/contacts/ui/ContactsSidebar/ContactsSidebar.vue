<template>
  <div class="contactsSidebar">
    <SidebarTitle>Контакты</SidebarTitle>
    <InputSearch v-model="searchValue" />
  </div>
</template>
<script setup lang="ts">
import { InputSearch } from 'shared/ui/inputSearch';
import { ref } from 'vue';

const searchValue = ref('');
</script>
<style scoped lang="scss">
.contacts {
}
</style>
