import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    headers: {
      // Required for Google OAuth popup to postMessage back to the opener.
      // "same-origin" (Vite default) blocks it; "same-origin-allow-popups" allows it.
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
  },
});
