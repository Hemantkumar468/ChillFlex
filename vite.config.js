import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function googleOAuthApiPlugin(env) {
  return {
    name: "google-oauth-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/auth/google/token" || req.method !== "POST") {
          return next();
        }

        try {
          const rawBody = await readRequestBody(req);
          const { code, redirectUri = "postmessage" } = JSON.parse(rawBody || "{}");

          if (!code) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Authorization code is required" }));
            return;
          }

          const clientId = env.VITE_GOOGLE_CLIENT_ID || env.GOOGLE_CLIENT_ID;
          const clientSecret = env.GOOGLE_CLIENT_SECRET;

          if (!clientId || !clientSecret) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: "Google OAuth is not configured on the server",
              })
            );
            return;
          }

          const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              code,
              client_id: clientId,
              client_secret: clientSecret,
              redirect_uri: redirectUri,
              grant_type: "authorization_code",
            }),
          });

          const tokens = await tokenResponse.json();

          if (!tokenResponse.ok) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: tokens.error_description || tokens.error || "Token exchange failed",
              })
            );
            return;
          }

          const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });

          const user = await userResponse.json();

          if (!userResponse.ok) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to fetch Google user profile" }));
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              user: {
                name: user.name,
                email: user.email,
                picture: user.picture,
                sub: user.sub,
              },
              accessToken: tokens.access_token,
            })
          );
        } catch (error) {
          console.error("[google-oauth-api]", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Internal server error" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), googleOAuthApiPlugin(env)],
    server: {
      port: 5173,
      strictPort: false,
      open: true,
    },
  };
});
