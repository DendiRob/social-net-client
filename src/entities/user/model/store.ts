import { defineStore } from 'pinia';
import { ref } from 'vue';

const namespaced = 'userStore';

export const useUserStore = defineStore(namespaced, () => {
  const userUrlHistory = ref('');

  return {
    userUrlHistory
  };
});
