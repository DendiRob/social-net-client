<template>
  <div
    :class="[
      'inputText-wrapper',
      { 'inputText-wrapper-warning': errorMessage?.length }
    ]"
  >
    <input
      @input="updateValue"
      v-model="value"
      :placeholder="placeholder"
      :type="inputType"
      class="inputText__input"
      autocomplete="on"
      :maxlength="maxLength"
    />
  </div>
</template>
<script setup lang="ts">
import { toRaw } from 'vue';
import { useField } from 'vee-validate';
const emit = defineEmits(['update:modelValue', 'input']);
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  placeholder: {
    type: String,
    default: () => ''
  },
  inputType: {
    type: String,
    default: () => 'text'
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

const updateValue = () => {
  const val = toRaw(value);
  emit('input', val);
  emit('update:modelValue', val);
};
</script>
<style scoped lang="scss">
.inputText {
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
