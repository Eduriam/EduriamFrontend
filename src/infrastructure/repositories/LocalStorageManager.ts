export const LocalStorageManager = {
  setItem<T>(key: string, value: T | null | undefined): void {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item) as T;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
};
