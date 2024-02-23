<template>
  <button :class="`btn ${size}-size ${btnStyle}`">
    <span :class="{ hideText: isLoading }">
      <slot></slot>
    </span>
    <div :class="['loader-wrapper', { isLoading }]">
      <span class="loader"></span>
    </div>
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
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});
</script>
<style scoped lang="scss">
.btn {
  cursor: pointer;
  border: none;
  font-weight: 600;
  color: #fff;
  position: relative;
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
  .loader-wrapper {
    width: 16px;
    height: 16px;
  }
}
.large-size {
  font-size: 1rem;
  padding: 0.571rem 1.714rem;
  border-radius: 0.571rem;
  .loader-wrapper {
    width: 24px;
    height: 24px;
  }
}
.cancel {
  color: #71747a;
  background: none;
  &:hover {
    opacity: 0.64;
    background: none;
  }
  .loader {
    border: 2px solid #9d9fa3;
    border-bottom-color: transparent;
  }
}
.warning {
  background: #f23051;
  &:hover {
    background: #ff4060;
  }
}
.hideText {
  visibility: hidden;
}

.loader {
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  height: 100%;
  width: 100%;
  &-wrapper {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.isLoading {
  display: block;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
