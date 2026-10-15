const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const getToken = () => localStorage.getItem("token");
export const getUser = () => JSON.parse(localStorage.getItem("user") || "null");

export function saveSession(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function api(path, { method = "GET", body } = {}) {
  const headers = { Accept: "application/json" };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && token) {
      clearSession();
    }
    const error = new Error(data.message || "Terjadi kesalahan");
    error.status = res.status;
    error.errors = data.errors || {};
    throw error;
  }

  return data;
}
