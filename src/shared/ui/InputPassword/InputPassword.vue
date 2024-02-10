<template>
  <div :class="['password', { 'password-warning': errorMessage?.length }]">
    <InputText
      @keydown.space.prevent
      @input="updateValue"
      v-model="value"
      :placeholder="placeholder"
      :inputType="currentInputType"
    />
    <div class="password__eye" @click="switchEye = !switchEye">
      <svg-icon
        :name="`eye-${switchEye ? 'open' : 'close'}`"
        class="password__eye_open"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { computed } from 'vue';
import { useField } from 'vee-validate';

import InputText from '../InputText';

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: ''
  },
  warning: {
    type: Boolean,
    default: () => false
  },
  name: {
    type: String,
    default: ''
  },
  rules: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['update:modelValue', 'input']);
const switchEye = ref(false);

const { value, errorMessage, validate } = useField(props.name, props.rules, {
  initialValue: toRaw(props.modelValue)
});

defineExpose({ validate });

const currentInputType = computed(() =>
  switchEye.value ? 'text' : 'password'
);
const updateValue = () => {
  const val = toRaw(value);

  emit('update:modelValue', val);
};
</script>
<style scoped lang="scss">
.password {
  position: relative;
  &__eye {
    top: 50%;
    position: absolute;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #248bf2;
    svg {
      width: 25px;
      height: 25px;
    }
  }
  &-warning {
    .inputText-wrapper {
      border: 1px solid #ff0000;
    }
    .password__eye {
      color: #ff0000;
    }
  }
}
</style>
