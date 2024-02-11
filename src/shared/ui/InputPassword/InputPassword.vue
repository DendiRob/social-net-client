<template>
  <div :class="['password']">
    <InputText
      v-bind="props"
      @keydown.space.prevent
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

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: ''
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
const switchEye = ref(false);

const currentInputType = computed(() =>
  switchEye.value ? 'text' : 'password'
);
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
