<template>
  <div
    :class="[
      'inputNumber-wrapper',
      { 'inputNumber-wrapper-warning': errorMessage?.length }
    ]"
  >
    <input
      @input="updateValue($event)"
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
import { toRaw } from 'vue';
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

const updateValue = (e: Event) => {
  if (
    props.maxLength !== null &&
    String(value.value).length === props.maxLength
  ) {
    return;
  }

  value.value = (e.target as HTMLInputElement).value;
};
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
