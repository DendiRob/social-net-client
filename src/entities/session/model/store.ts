import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from 'shared/lib';
import { accessTokenName } from 'shared/config';

const namespaced = 'session';

interface ISessionUser {
  id: number | undefined;
  email: string;
  name: string;
  uuid: string;
}

export const useSessionStore = defineStore(namespaced, () => {
  const userId = ref<number | undefined>(undefined);
  const userEmail = ref('');
  const userName = ref('');
  const userUuid = ref('');

  const { value: tokenValue, setLSValue: setLSToken } = useLocalStorage(
    accessTokenName,
    ''
  );

  const token = ref(tokenValue);
  function setAccessToken(value: string) {
    token.value = value;
    setLSToken(value);
  }

  function removeToken() {
    setAccessToken('');
  }

  const isAuth = computed(() => Boolean(userId.value));

  function setUser(data: ISessionUser) {
    userId.value = data.id;
    userName.value = data.name;
    userEmail.value = data.email;
    userUuid.value = data.uuid;
  }

  function logout() {
    removeToken();
    //удалени куки не забыть запрос к серверу
    setUser({
      id: undefined,
      uuid: '',
      name: '',
      email: ''
    });
  }

  return {
    setAccessToken,
    setUser,
    isAuth,
    logout,
    userEmail,
    userId,
    userName,
    userUuid
  };
});
