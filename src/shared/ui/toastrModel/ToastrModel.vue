<template>
  <div class="toastr" v-if="toastrStore.toastersTasks.length >= 0">
    <div class="toastr__box">
      <transition-group name="list">
        <div
          @click="toastrStore.deleteToaster(item.id as number)"
          class="toastr__item"
          v-for="item in toastrStore.toastersTasks"
          :key="item.id"
        >
          <div class="toastr__item_title">
            <div class="icon">
              <svg-icon v-if="item.isError" name="error" />
              <svg-icon v-else name="success" />
            </div>
            <div
              :class="[
                'status',
                { status__success: !item.isError },
                { status__error: item.isError }
              ]"
            >
              {{ item.status }}
            </div>
          </div>
          <div class="toastr__item_text">{{ item.text }}</div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script setup lang="ts">
import useToastr from 'shared/lib/useToastr';
const toastrStore = useToastr();
</script>
<style scoped lang="scss">
.toastr {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  &__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  &__item {
    width: 400px;
    min-height: 130px;
    background-color: #f2f3f5;
    border-radius: 12px;
    margin-bottom: 10px;
    padding: 24px;
    &_title {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 10px;
        width: 30px;
        height: 30px;
      }
      .status {
        font-weight: 700;
        font-size: 22px;
        color: #171a1f;
        &__success {
          color: #228b22;
        }
        &__error {
          color: #f23051;
        }
      }
    }
    &_text {
      margin-top: 8px;
      margin-bottom: 0;
      font-weight: 400;
      font-size: 15px;
      color: #171a1f;
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from {
  transform: translateY(100%);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
