import { defineStore } from 'pinia';
import { ref } from 'vue';

const namespaced = 'userStore';
// если вдруг появится логика, в которой нужно разделение на авторизованого и обычного посетителя сайта
export const useUserStore = defineStore(namespaced, () => {
  const userUrlHistory = ref('');

  return {
    userUrlHistory
  };
});
