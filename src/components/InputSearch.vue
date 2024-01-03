<template>
  <div class="search">
    <div class="search-wrapper">
      <input
        @input="updateValue"
        :value="modelValue"
        placeholder="Search"
        type="text"
        class="search__input"
      />
      <svg-icon name="search" class="search__icon" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>
<style scoped lang="scss">
.search {
  width: 100%;
  margin-top: 12px;
  &-wrapper {
    margin: 0 auto;
    width: 328px;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
  }
  &__input {
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(201, 204, 209, 0.24);
    color: #171a1f;
    font-size: 15px;
    font-weight: 400;
    padding: 8px 16px;
    padding-left: 36px;
    border: none;
    outline: none;
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    width: 16px;
    height: 16px;
  }
}
</style>
