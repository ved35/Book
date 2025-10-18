import { create } from "zustand";
import storage, { setItem, getItem, removeItem, setObject, getObject } from "../lib/storage";
import api from "../lib/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const { data } = await api.post('/auth/register', { username, email, password });

  // MMKV is synchronous. Store objects via setObject helper.
  setObject("user", data.user);
  setItem("token", data.token);

  set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const { data } = await api.post('/auth/login', { email, password });

  setObject("user", data.user);
  setItem("token", data.token);

  set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  checkAuth: async () => {
    try {
  // MMKV has synchronous getters
  const token = getItem("token");
  const user = getObject("user");

  set({ token, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
  removeItem("token");
  removeItem("user");
  set({ token: null, user: null });
  },
}));
