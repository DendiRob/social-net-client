import axios from 'axios';
import useToastr from 'shared/lib/useToastr';

export default function isAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const toastr = useToastr();
    const apiErrors = error.response?.data;
    const payload = Array.isArray(apiErrors?.payload)
      ? apiErrors.payload[0]
      : apiErrors.payload;
    toastr.error({ text: payload });
    return true;
  }
  return false;
}
