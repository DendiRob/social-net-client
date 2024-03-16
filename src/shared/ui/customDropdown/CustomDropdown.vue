<template>
  <div class="dropdown">
    <div @click.stop="switcher" :class="[{ disabled }]">
      <div v-if="disabled" class="disabled__cover"></div>
      <input
        readonly
        :value="modelValue"
        :placeholder="placeholder"
        class="item item__selected"
        :disabled="disabled"
      />
      <SvgIcon :class="['arrow', { active: isActive }]" name="arrow-dropdown" />
    </div>
    <div
      v-if="isActive"
      class="item__list"
      :style="{ maxHeight: maxHeight + 'px' }"
    >
      <div @click="updateValue('asdadsasd')" class="item">asdasdas</div>
      <div @click="updateValue('asdadsasd')" class="item">asdasdas</div>
      <div @click="updateValue('asdadsasd')" class="item">asdasdas</div>
      <div @click="updateValue('asdadsasd')" class="item">asdasdas</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  placeholder: {
    type: String,
    default: () => ''
  },
  maxHeight: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const isActive = ref(false);
const closeList = () => {
  isActive.value = false;
};

const switcher = () => {
  if (props.disabled) return;
  isActive.value = !isActive.value;
};

const updateValue = (value: string) => {
  closeList();
  emit('update:modelValue', value);
};

onMounted(() => {
  window.addEventListener('click', closeList);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeList);
});
</script>
<style scoped lang="scss">
.dropdown {
  width: auto;
  color: #171a1f;
  position: relative;
  .item {
    padding: 0.571rem 1.142rem;
    background: #fff;
    width: 100%;
    font-weight: 400;
    font-size: 1.071rem;
    cursor: pointer;
    &:hover {
      background: rgba(201, 204, 209, 0.24);
    }
    &__list {
      padding: 0.571rem 0;
      top: calc(100% + 0.571rem);
      background: #fff;
      box-shadow:
        0 0 48px 0 rgba(0, 0, 0, 0.04),
        0 8px 24px 0 rgba(0, 0, 0, 0.08);
      border-radius: 0.571rem;
      overflow: hidden;
      position: absolute;
      width: 100%;
      z-index: 100;
      overflow-y: auto;
    }
    &__selected {
      width: 100%;
      border-radius: 0.571rem;
      outline: none;
      border: none;
      background: rgba(201, 204, 209, 0.24);
      padding: 1.142rem;
    }
  }
  .arrow {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 16px;
    top: 50%;
    cursor: pointer;
    transform: translateY(-50%) rotate(180deg);
  }
  .active {
    transform: translateY(-50%);
  }
}
.disabled {
  &__cover {
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 2;
    position: absolute;
    opacity: 0.5;
  }
  .arrow,
  input {
    color: #b5b5b5;
  }
}
</style>
