import { useAuthStore } from "@/store/auth";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

export async function apiFetch(input: RequestInfo, init: RequestInit = {}) {
  const accessToken = useAuthStore.getState().accessToken;

  const res = await fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    credentials: "include",
  });

  // kalau bukan 401 langsung return
  if (res.status !== 401) return res;

  if (!isRefreshing) {
    isRefreshing = true;

    refreshPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("refresh failed");

        const data = await r.json();

        useAuthStore.setState({
          accessToken: data.accessToken,
        });

        return data.accessToken;
      })
      .catch(() => {
        useAuthStore.getState().logout();
        return null;
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  const newToken = await refreshPromise;

  if (!newToken) {
    throw new Error("Unauthorized");
  }

  // retry request
  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${newToken}`,
    },
    credentials: "include",
  });
}
