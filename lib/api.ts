import { useAuthStore } from "@/store/auth";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const { accessToken, setAuth, logout } = useAuthStore.getState();

  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      logout();
      return res;
    }

    const data = await refreshRes.json();

    setAuth(data.access_token, data.user);

    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.access_token}`,
      },
      credentials: "include",
    });
  }

  return res;
};
