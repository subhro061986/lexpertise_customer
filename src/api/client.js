const API_BASE_URL = "http://127.0.0.1:8000";

export async function apiRequest(path, options = {}) {
  // Attach JWT token if available
  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(API_BASE_URL + path, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    if (Array.isArray(data.detail)) {
      const messages = data.detail.map((err) => {
        const field = err.loc?.[1];
        return field ? `${field.replace("_", " ")}: ${err.msg}` : err.msg;
      });
      throw new Error(messages.join("\n"));
    }
    throw new Error(data.detail || "Something went wrong");
  }

  return data;
}