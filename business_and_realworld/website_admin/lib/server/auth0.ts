import { initAuth0 } from "@auth0/nextjs-auth0";

export const auth0 = initAuth0({
  domain: process.env.AUTH0_DOMAIN || "",
  clientId: process.env.AUTH0_CLIENT_ID || "",
  clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
  scope: "openid profile",
  redirectUri: "http://localhost:3000/api/callback",
  postLogoutRedirectUri: "http://localhost:3000/",
  session: { cookieSecret: process.env.AUTH0_CLIENT_SECRET || "" },
});
