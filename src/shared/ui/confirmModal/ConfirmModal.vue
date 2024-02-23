<template>
  <teleport to="body"
    ><div class="confirm-overlay">
      <div class="confirm__wrapper">
        <div class="confirm__top">
          <div class="question">{{ title }}</div>
          <div class="warning">{{ warning }}</div>
        </div>
        <div class="confirm__btns">
          <div class="cancel">Отменить</div>
          <div class="confirm">Подтвердить</div>
        </div>
      </div>
    </div></teleport
  >
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: 'Подтвердите своё действие.'
  },
  warning: {
    type: String,
    default: ''
  }
});
</script>
<style scoped lang="scss">
.confirm {
  &-overlay {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.48);
    top: 0;
  }
  &__wrapper {
    width: 400px;
    border-radius: 0.85rem;
    box-shadow:
      0 0 96px 0 rgba(0, 0, 0, 0.08),
      0 8px 48px 0 rgba(0, 0, 0, 0.16);
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__top {
    padding: 1.45rem 1.715rem;
    .question {
      font-weight: 700;
      font-size: 1.5rem;
      color: #171a1f;
      margin-bottom: 8px;
    }
    .warning {
      font-weight: 400;
      font-size: 1.07rem;
      color: #171a1f;
    }
  }
  &__btns {
    background: #f2f3f5;
    padding: 1.07rem 1.7rem;
    height: 100%;
  }
}
</style>
