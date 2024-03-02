<template>
  <div class="inputImg" @click="imageInput?.click">
    <img
      :src="avatarUrl"
      alt="avatar"
      :class="{ defaultAvatar: !modelValue }"
    />
    <div
      @click.stop="deleteAvatar"
      :class="['deleteAvatar', { showDeleteAvatar: modelValue }]"
    >
      <SvgIcon name="close" />
    </div>
    <input
      class="inputImg-hidden"
      type="file"
      accept=".png,.jpg,.jpeg"
      ref="imageInput"
      alt="set avatar"
      @change="setAvatar"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import addPhoto from 'shared/ui/assets/add-photo.svg';

const emits = defineEmits(['update:modelValue', 'delete']);
const props = defineProps({
  modelValue: {
    default: null
  }
});

const imageInput = ref<any>();

function setAvatar(e: Event) {
  const inputTarget = e.target as HTMLInputElement;
  if (inputTarget?.files === null) return;

  emits('update:modelValue', inputTarget.files[0]);
}

const avatarUrl = computed(() => {
  if (props.modelValue === null) {
    return addPhoto;
  } else {
    return URL.createObjectURL(props.modelValue as Blob | MediaSource);
  }
});

function deleteAvatar() {
  if (imageInput.value === undefined) return;
  const list = new DataTransfer();

  imageInput.value.files = list.files;
  emits('delete');
  emits('update:modelValue', null);
}
</script>
<style scoped lang="scss">
.inputImg {
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #f2f3f5;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  &:hover {
    .showDeleteAvatar {
      display: flex;
    }
  }
  .defaultAvatar {
    width: auto;
    height: auto;
  }
  .deleteAvatar {
    width: 100%;
    height: 100%;
    background-color: rgba(199, 0, 0, 0.5);
    position: absolute;
    display: none;
    justify-content: center;
    align-items: center;
    svg {
      color: #f2f3f5;
      width: 40px;
      height: 40px;
    }
  }
  &-hidden {
    opacity: 0;
    margin: 0;
    padding: 0;
    height: 0;
    width: 0;
    line-height: 0;
    overflow: hidden;
  }
}
</style>
