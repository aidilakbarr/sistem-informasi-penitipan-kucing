"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { refreshToken } from "@/services/api/auth.service";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const setAuthChecked = useAuthStore((s) => s.setAuthChecked);
  const { fetchMe } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = useAuthStore.getState().accessToken;

        if (!token) {
          logout();
          setAuthChecked(true);
          return;
        }

        await fetchMe();
      } catch (err: any) {
        if (err?.response?.status === 401) {
          try {
            const res = await refreshToken();

            setAuth(res.token, {
              id: res.user.id,
              name: res.user.name,
              role: res.user.role,
            });
          } catch {
            logout();
          }
        } else {
          logout();
        }
      } finally {
        setAuthChecked(true);
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
}
