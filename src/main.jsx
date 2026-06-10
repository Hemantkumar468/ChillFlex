import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  console.error(
    "[StreamVault] VITE_GOOGLE_CLIENT_ID missing in .env — Google login disabled."
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId={googleClientId || "missing-client-id"}
      onScriptLoadError={() =>
        console.error("[StreamVault] Failed to load Google Identity Services script.")
      }
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
