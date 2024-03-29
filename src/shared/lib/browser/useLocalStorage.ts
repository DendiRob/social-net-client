export function useLocalStorage(key: string, initialValue: string) {
  const keyLS = key;

  const valueLS = localStorage.getItem(keyLS); //TODO:  разобраться с этим хуком
  const value: string = valueLS ? valueLS : initialValue;

  function setLSValue(value: string): void {
    localStorage.setItem(keyLS, value);
  }

  return { value, setLSValue };
}
