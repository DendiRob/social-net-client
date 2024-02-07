<template>
  <div :class="['password', { 'password-warning': warning }]">
    <InputText
      @keydown.space.prevent
      @input="updateValue"
      :modelValue="modelValue"
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
import { ref } from 'vue';
import { computed } from 'vue';
import InputText from '../InputText';

defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: ''
  },
  warning: {
    type: Boolean,
    default: () => false
  }
});
const emit = defineEmits(['update:modelValue']);
const switchEye = ref(false);

const currentInputType = computed(() =>
  switchEye.value ? 'text' : 'password'
);
const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
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
