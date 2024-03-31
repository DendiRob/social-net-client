<template>
  <textarea
    :value="modelValue"
    @input="updateValue"
    class="customTextarea"
    :placeholder="placeholder"
    :maxlength="maxLength"
  ></textarea>
</template>
<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: { type: String, default: '' },
  maxLength: { type: Number, default: null }
});

const emits = defineEmits(['update:modelValue']);

const updateValue = (e: Event) => {
  emits('update:modelValue', (e.target as HTMLInputElement).value);
};
</script>
<style scoped lang="scss">
.customTextarea {
  resize: none;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(201, 204, 209, 0.24);
  color: #171a1f;
  font-size: 1.071rem;
  font-weight: 400;
  padding: 1.142rem;
  border: none;
  border-radius: 8px;
  height: 100%;
}
</style>
