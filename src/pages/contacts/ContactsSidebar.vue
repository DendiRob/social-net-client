<template>
  <div class="contactsSidebar">
    <h1 class="contacts__title">Contacts</h1>
    <InputSearch v-model="searchValue" />
    {{ searchValue }}
  </div>
</template>
<script setup>
import InputSearch from '../../components/InputSearch.vue';
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
