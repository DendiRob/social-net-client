export function useLocalStorage(key: string, initialValue: string) {
  const keyLS = key;

  const valueLS = localStorage.getItem(keyLS);
  const value: string = valueLS ? valueLS : initialValue;

  function setLSValue(value: string): void {
    window.localStorage.setItem(keyLS, JSON.stringify(value));
  }

  return { value, setLSValue };
}
