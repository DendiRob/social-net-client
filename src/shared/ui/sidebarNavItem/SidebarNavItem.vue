<template>
  <div class="item__wrapper">
    <svg-icon :name="iconName" class="item__icon" />
    <div class="item__label">{{ itemLabel }}</div>
  </div>
</template>
<script setup lang="ts">
defineProps(['iconName', 'itemLabel']);
</script>
<style scoped lang="scss">
.item {
  &__wrapper {
    box-sizing: border-box;
    display: flex;
    padding: 12px 16px;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #398fe5;
      transition-duration: 300ms;
      .item__label,
      .item__icon {
        color: #ffffff;
      }
    }
  }
  &__icon {
    margin-right: 16px;
    color: #71747a;
    max-width: 20px;
    max-height: 20px;
  }
  &__label {
    color: #171a1f;
    font-size: 15px;
    font-weight: 400;
  }
}
</style>
