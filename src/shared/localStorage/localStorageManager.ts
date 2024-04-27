const localStorageManager = {
  setValue: (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },
  getValue: (key: string) => {
    return localStorage.getItem(key);
  },
  removeValue: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default localStorageManager;
