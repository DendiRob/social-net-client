<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="'#icon-' + name" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
