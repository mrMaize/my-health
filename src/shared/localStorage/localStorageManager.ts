const localStorageManager = {
  setValue: (key: string, value: any) => {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  getValue: (key: string, defaultValue: any = null) => {
    const value = localStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  },
  removeValue: (key: string) => {
    localStorage.removeItem(key);
  },
};

export default localStorageManager;
