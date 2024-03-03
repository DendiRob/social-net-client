<template>
  <div class="avatar-wrapper">
    <AvatarInput v-model="image" @delete="deleteAvatar" />
  </div>
</template>
<script setup lang="ts">
import { AvatarInput } from 'entities/profile';
import { onMounted, ref } from 'vue';

const props = defineProps({
  imgData: {
    type: String,
    default: null
  }
});

const image = ref();

async function deleteAvatar() {
  // TODO:  запрос на удаление файла по id
}

onMounted(() => {
  image.value = props.imgData;
});
</script>
<style scoped lang="scss">
.avatar {
  &-wrapper {
    width: 120px;
    height: 120px;
  }
}
</style>
