<template>
  <button :class="`btn ${size}-size ${btnStyle}`">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'middle'
  },
  label: {
    type: String,
    default: ''
  },
  btnStyle: {
    type: String,
    default: 'default'
  }
});
</script>
<style scoped lang="scss">
.btn {
  cursor: pointer;
  border: none;
  font-weight: 600;
  color: #fff;
}
.default {
  background: #248bf2;
  &:hover {
    background: #39f;
  }
}
.middle-size {
  font-size: 1rem;
  padding: 0.428rem 1.142rem;
  border-radius: 7.142rem;
}
.large-size {
  font-size: 1rem;
  padding: 0.571rem 1.714rem;
  border-radius: 0.571rem;
}
.cancel {
  color: #71747a;
  background: none;
  &:hover {
    opacity: 0.64;
    background: none;
  }
}
.warning {
  background: #f23051;
  &:hover {
    background: #ff4060;
  }
}
</style>
