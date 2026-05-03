import { useAuthStore } from "@/store/auth";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const buildHeaders = (token?: string, isFormData?: boolean): HeadersInit => ({
  ...(token && {
    Authorization: `Bearer ${token}`,
  }),
  ...(isFormData ? {} : { "Content-Type": "application/json" }),
});

export async function apiFetch<T = any>(
  endpoint: string,
  init: RequestInit = {},
): Promise<T> {
  const { accessToken } = useAuthStore.getState();

  const isFormData = init.body instanceof FormData;

  let res = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      ...buildHeaders(accessToken ?? undefined, isFormData),
      ...init.headers,
    },
    credentials: "include",
  });

  if (res.status !== 401) {
    return handleResponse(res);
  }

  if (!isRefreshing) {
    isRefreshing = true;

    refreshPromise = fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Refresh failed");

        const data = await r.json();

        useAuthStore.setState({
          accessToken: data.data.accessToken,
        });

        return data.data.accessToken;
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

  res = await fetch(`${BASE_URL}${endpoint}`, {
    ...init,
    headers: {
      ...buildHeaders(newToken, isFormData),
      ...init.headers,
    },
    credentials: "include",
  });

  return handleResponse(res);
}

// ✅ helper response
async function handleResponse(res: Response) {
  let data;

  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "API Error");
  }

  return data;
}
