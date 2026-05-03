import { useAuthStore } from "@/store/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const { accessToken, setAuth, logout } = useAuthStore.getState();

  const headers: HeadersInit = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(accessToken && {
      Authorization: `Bearer ${accessToken}`,
    }),
  };

  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401) {
    try {
      const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) {
        logout();
        throw new Error("Session expired");
      }

      const refreshData = await refreshRes.json();

      const newAccessToken = refreshData.accessToken;

      setAuth(newAccessToken, refreshData.user ?? null);

      res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type": "application/json",
          Authorization: `Bearer ${newAccessToken}`,
        },
        credentials: "include",
      });
    } catch (err) {
      logout();
      throw err;
    }
  }

  if (!res.ok) {
    let message = "API Error";

    try {
      const err = await res.json();
      message = err.message || message;
    } catch {}

    throw new Error(message);
  }

  return res.json();
};
