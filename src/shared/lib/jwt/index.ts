import { accessTokenName } from 'shared/config';
import { useLocalStorage } from '../browser/useLocalStorage';

const { setLSValue: setLSToken } = useLocalStorage(accessTokenName, '');

export function setAccessToken(value: string) {
  setLSToken(value);
}
