<template>
  <textarea
    v-model="value"
    class="customTextarea"
    :placeholder="placeholder"
    :maxlength="maxLength"
  ></textarea>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRaw } from 'vue';

const props = defineProps({
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
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: { type: String, default: '' },
  maxLength: { type: Number, default: null }
});

const { value, validate } = useField(props.name, props.rules, {
  syncVModel: true,
  initialValue: toRaw(props.modelValue),
  ...props.options
});

defineExpose({ validate });
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
