<template>
  <div
    :class="[
      'inputNumber-wrapper',
      { 'inputNumber-wrapper-warning': errorMessage?.length }
    ]"
  >
    <input
      v-model="value"
      :placeholder="placeholder"
      type="number"
      class="inputNumber__input"
      autocomplete="on"
      :maxlength="maxLength"
    />
  </div>
</template>
<script setup lang="ts">
import { toRaw, watch } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  placeholder: {
    type: String,
    default: () => ''
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  name: {
    type: String,
    default: () => ' '
  },
  options: {
    type: Object,
    default: () => ({})
  },
  maxLength: {
    type: Number,
    default: null
  }
});
const { value, errorMessage, validate } = useField(props.name, props.rules, {
  initialValue: toRaw(props.modelValue),
  ...props.options
});

defineExpose({ validate });

watch(value as any, () => {
  if (String(value.value).length > props.maxLength) {
    value.value = String(value.value).slice(0, -1);
  }
});
</script>
<style scoped lang="scss">
.inputNumber {
  width: 100%;
  margin-top: 12px;
  &-wrapper {
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    position: relative;
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &-warning {
      border: 1px solid #ff0000;
    }
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
