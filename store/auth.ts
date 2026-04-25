import { getMe } from "@/services/api/auth.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "ADMIN" | "CUSTOMER" | "COURIER" | "CARETAKER" | null;

interface User {
  id: string;
  name: string;
  role: Role;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthChecked: boolean;

  setAuth: (token: string, user: User) => void;
  logout: () => void;

  isAuthenticated: () => boolean;
  getRole: () => Role;

  setAuthChecked: (value: boolean) => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthChecked: false,

      setAuth: (token, user) =>
        set({
          accessToken: token,
          user,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),

      isAuthenticated: () => !!get().accessToken,
      getRole: () => get().user?.role ?? null,

      setAuthChecked: (value) =>
        set({
          isAuthChecked: value,
        }),

      fetchMe: async () => {
        try {
          const token = get().accessToken;

          console.log("TOKEN:", token); // 🔍 debug

          if (!token) {
            set({ isAuthChecked: true });
            return;
          }

          const user = await getMe(token);

          console.log("USER:", user); // 🔍 debug

          set({
            user,
            isAuthChecked: true,
          });
        } catch (error) {
          console.error("fetchMe error:", error);

          set({
            user: null,
            accessToken: null,
            isAuthChecked: true,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    },
  ),
);
