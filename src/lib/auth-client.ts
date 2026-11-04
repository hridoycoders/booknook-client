import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://booknook-lib.vercel.app"
      : "http://localhost:3000",

  plugins: [jwtClient()],
});
