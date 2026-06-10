const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function exchangeGoogleAuthCode(code, redirectUri = "postmessage") {
  const response = await fetch(`${API_BASE}/api/auth/google/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, redirectUri }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Google login failed");
  }

  return data;
}
