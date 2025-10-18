import { MMKV } from 'react-native-mmkv';

// Create a single MMKV instance for the app
export const storage = new MMKV({ id: 'app_storage' });

// String helpers
export const setItem = (key, value) => {
  storage.set(key, value);
};

export const getItem = (key) => {
  const value = storage.getString(key);
  return value === undefined ? null : value;
};

export const removeItem = (key) => {
  storage.delete(key);
};

// Object helpers (serialize/deserialize)
export const setObject = (key, obj) => {
  try {
    storage.set(key, JSON.stringify(obj));
  } catch (e) {
    console.warn('Failed to set object', e);
  }
};

export const getObject = (key) => {
  try {
    const raw = storage.getString(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to parse object', e);
    return null;
  }
};

export default {
  storage,
  setItem,
  getItem,
  removeItem,
  setObject,
  getObject,
};
