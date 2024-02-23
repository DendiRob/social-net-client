import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IToasterInfo {
  isError?: boolean;
  status?: string;
  text?: string;
  id?: number;
}

function getRandom() {
  return Math.random();
}

const namespace = 'notificationToastr';

export const useToastr = defineStore(namespace, () => {
  const toastersTasks = ref<IToasterInfo[]>([]);
  const defaultDuration = 5000;

  const deleteToaster = (id: number) => {
    const indexlEl = toastersTasks.value.findIndex((i) => i.id === id);
    toastersTasks.value.splice(indexlEl, 1);
  };

  const setToaster = (data: IToasterInfo, duration = defaultDuration) => {
    const payload = {
      isError: data.isError,
      status: data.status,
      text: data.text,
      id: data.id
    };

    toastersTasks.value.push(payload);

    setTimeout(() => {
      deleteToaster(payload.id as number);
    }, duration);
  };

  const success = (data: IToasterInfo, duration?: number) => {
    setToaster(
      {
        status: data.status ?? 'Успешно!',
        text: data.text ?? '',
        isError: false,
        id: getRandom()
      },
      duration
    );
  };

  const error = (data: IToasterInfo, duration?: number) => {
    setToaster(
      {
        status: data.status ?? 'Ошибка',
        text: data.text ?? '',
        isError: true
      },
      duration
    );
  };

  return {
    success,
    error,
    toastersTasks,
    deleteToaster
  };
});
