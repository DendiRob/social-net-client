<template>
  <div>
    <div class="trigger" @click="isActive = true">
      <slot></slot>
    </div>
    <teleport to="body">
      <div :class="['confirm-overlay', { isActive }]">
        <div class="confirm__wrapper">
          <div class="confirm__top">
            <div class="question">{{ title }}</div>
            <div class="warning">{{ warning }}</div>
          </div>
          <div class="confirm__btns">
            <custom-btn
              :style="'cancel'"
              size="large"
              @click="isActive = false"
              class="cancel"
            >
              Отмена
            </custom-btn>
            <custom-btn
              class="confirm"
              @click="emits('confirm')"
              size="large"
              btnStyle="warning"
              :isLoading="isLoading"
            >
              Подтвердить
            </custom-btn>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script setup lang="ts">
import CustomBtn from 'shared/ui/customBtn';
import { ref } from 'vue';

const emits = defineEmits(['confirm']);
defineProps({
  title: {
    type: String,
    default: 'Подтвердите своё действие'
  },
  warning: {
    type: String,
    default: ''
  }
});

const isActive = ref(false);
const isLoading = ref(false);

defineExpose({ isActive, isLoading });
</script>
<style scoped lang="scss">
.confirm {
  &-overlay {
    width: 100%;
    height: 100vh;
    display: none;
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
    display: flex;
    justify-content: flex-end;
  }
}

.isActive {
  display: flex;
}
</style>
