import { defineStore } from 'pinia';
import { ref } from 'vue';

interface IToasterInfo {
  isError?: boolean;
  status?: string;
  text?: string;
  id?: number;
}

const namespace = 'notificationToastr';

export const useToastr = defineStore(namespace, () => {
  const toastersTasks = ref<IToasterInfo[]>([]);
  const isLoading = ref(false);
  const duration = 5000;

  const deleteToaster = (id: number) => {
    toastersTasks.value = toastersTasks.value.filter((i) => i.id !== id);
  };

  const setToaster = (data: IToasterInfo) => {
    const payload = {
      isError: data.isError,
      status: data.status,
      text: data.text
    };

    toastersTasks.value.push(payload);
    const toastId = toastersTasks.value.length - 1;
    toastersTasks.value[toastId].id = toastId;

    setTimeout(() => {
      deleteToaster(toastId);
    }, duration);
  };

  const success = (data: IToasterInfo) => {
    setToaster({
      status: data.status ?? 'Успешно!',
      text: data.text ?? '',
      isError: false
    });
  };

  const error = (data: IToasterInfo) => {
    setToaster({
      status: data.status ?? 'Ошибка',
      text: data.text ?? '',
      isError: true
    });
  };

  return {
    success,
    error,
    toastersTasks,
    isLoading,
    deleteToaster
  };
});
