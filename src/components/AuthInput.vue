<template>
  <div class="search-wrapper">
    <input
      @input="updateValue"
      :value="modelValue"
      :placeholder="placeholder"
      type="text"
      class="search__input"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: ''
  }
});
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
    width: 100%;
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
    padding: 16px;
    border: none;
    outline: none;
  }
}
</style>
