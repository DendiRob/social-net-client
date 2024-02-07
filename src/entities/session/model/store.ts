import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import { useLocalStorage } from 'shared/lib';
import { accessTokenName } from 'shared/config';
import { SessionApi } from 'entities/session';

const namespaced = 'session';

interface ISessionData {
  id: number | undefined;
  email: string;
  name: string;
  uuid: string;
}

export const useSessionStore = defineStore(namespaced, () => {
  const viewerId = ref<number | undefined>(undefined);
  const viewerEmail = ref('');
  const viewerName = ref('');
  const viewerUuid = ref('');

  const { value: tokenValue, setLSValue: setLSToken } = useLocalStorage(
    accessTokenName,
    ''
  );

  const token = ref(tokenValue);
  function setAccessToken(value: string) {
    token.value = value;
    setLSToken(value);
  }

  async function getViewer() {
    try {
      const res = await SessionApi.getViewer();
      setViewer(res.data);
    } catch (error) {
      console.log(error); // TODO: error handler
    }
  }

  function removeToken() {
    setAccessToken('');
  }

  const isAuth = computed(() => Boolean(viewerId.value));

  function setViewer(data: ISessionData) {
    viewerId.value = data.id;
    viewerName.value = data.name;
    viewerEmail.value = data.email;
    viewerUuid.value = data.uuid;
  }

  async function logout() {
    try {
      removeToken();
      await SessionApi.logout();
      setViewer({
        id: undefined,
        uuid: '',
        name: '',
        email: ''
      });
    } catch (error) {
      // TODO: Сделать обработчик ошибок
      console.log(error);
    }
  }

  return {
    setAccessToken,
    setViewer,
    isAuth,
    logout,
    viewerEmail,
    viewerId,
    viewerName,
    viewerUuid,
    getViewer
  };
});
