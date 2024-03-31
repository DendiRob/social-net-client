<template>
  <div
    :class="[
      'inputNumber-wrapper',
      { 'inputNumber-wrapper-warning': errorMessage?.length }
    ]"
  >
    <div class="errorMessage">{{ errorMessage }}</div>
    <input
      v-model="value"
      :placeholder="placeholder"
      type="number"
      class="inputNumber__input"
      :class="{ 'inputNumber__input-warning': errorMessage?.length }"
      autocomplete="on"
      :maxlength="maxLength"
      @input="onInput"
    />
  </div>
</template>
<script setup lang="ts">
import { toRaw, watch } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  modelValue: {
    type: Number,
    default: () => null
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
  },
  onlyInt: {
    type: Boolean,
    default: false
  }
});
const { value, errorMessage, validate } = useField(props.name, props.rules, {
  syncVModel: true,
  initialValue: toRaw(props.modelValue),
  ...props.options
});
const emits = defineEmits(['input', 'update:modelValue']);
defineExpose({ validate });

watch(value, () => {
  const stringVal = String(value.value);
  if (stringVal.includes('.')) {
    const stringInd = stringVal.indexOf('.');
    value.value = +stringVal.slice(0, stringInd);
  }

  if (stringVal.length > props.maxLength) {
    value.value = +stringVal.slice(0, -1);
  }
});

function onInput() {
  const { value: rawValue } = toRaw(value);

  emits('input', +rawValue);
  emits('update:modelValue', +rawValue);
}
</script>
<style scoped lang="scss">
.inputNumber {
  width: 100%;
  margin-top: 12px;
  &-wrapper {
    width: 100%;
    position: relative;
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
    border-radius: 8px;
    &-warning {
      border: 1px solid #ff0000;
    }
  }
}
.errorMessage {
  position: absolute;
  bottom: calc(100% + 1px);
  max-width: 100%;
  color: #ff0000;
  font-weight: 500;
}
</style>
