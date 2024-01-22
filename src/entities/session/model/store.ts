import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from 'shared/lib/browser';
import { accessTokenName } from 'shared/config';
// import type { UserModel } from '@/entities/User';
// import { api } from '../api';
// import { useAlertsStore } from '@/shared/ui/TheAlerts';
// import useTimeout from '@/shared/lib/use/useTimeout';

const namespaced = 'session';

interface ISessionUser {
  id: number | undefined;
  email: string;
  name: string;
  uuid: string;
}

export const useSessionStore = defineStore(namespaced, () => {
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

  //   async function getToken() {
  //     try {
  //       const { data } = await api.getToken(refreshToken.value);
  //       setToken(data.id_token);
  //       setRefreshToken(data.refresh_token);
  //       setTimeoutGetToken();
  //     } catch (e: any) {
  //       showError(e.message);
  //     }
  //   }

  const user = reactive<ISessionUser>({
    id: undefined,
    name: '',
    email: '',
    uuid: ''
  });

  const isAuth = computed(() => Boolean(user.id));

  function setUser(data: ISessionUser) {
    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.uuid = data.uuid;
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
    user,
    setUser,
    isAuth,
    logout
  };
});
