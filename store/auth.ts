import { create } from "zustand";

type Role = "ADMIN" | "CUSTOMER" | "COURIER" | "CARETAKER" | null;

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;

  isAuthChecked: boolean;

  setAuth: (token: string, user: User) => void;
  logout: () => void;

  hydrate: () => Promise<void>;

  isAuthenticated: () => boolean;
  getRole: () => Role;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthChecked: false,

  setAuth: (token, user) =>
    set({
      accessToken: token,
      user,
      isAuthChecked: true,
    }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      isAuthChecked: true,
    }),

  isAuthenticated: () => !!get().user,

  getRole: () => get().user?.role ?? null,

  hydrate: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        set({ user: null, accessToken: null, isAuthChecked: true });
        return;
      }

      const data = await res.json();

      const user = data.data || data.user || null;

      set({
        user,
        accessToken: data.data.accessToken ?? null,
        isAuthChecked: true,
      });
    } catch (err) {
      console.log("HYDRATE ERROR:", err);

      set({ user: null, accessToken: null, isAuthChecked: true });
    }
  },
}));
