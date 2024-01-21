<template>
  <div class="contactsSidebar">
    <h1 class="contacts__title">Contacts</h1>
    <InputSearch v-model="searchValue" />
  </div>
</template>
<script setup lang="ts">
import { InputSearch } from "shared/ui/inputSearch";
import { ref } from 'vue';

const searchValue = ref('');
</script>
<style scoped lang="scss">
.contacts {
  &__title {
    color: #171a1f;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    margin: 0;
    margin-left: 16px;
  }
}
</style>
