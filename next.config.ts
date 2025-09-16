import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { SupabasePaths } from "./lib/constants/supabase-storage";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "127.0.0.1",
    "*",
    "ubiquitous-cod-q9p47457wqqc54w-3000.app.github.dev",
    "https://ubiquitous-cod-q9p47457wqqc54w-3000.app.github.dev/auth/register",
    "*",
    "*.app.github.dev",
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: process.env.CODESPACES
        ? [
            {
              key: "X-Forwarded-Host",
              value: `${process.env.CODESPACE_NAME}-3000.github.dev`,
            },
            {
              key: "Access-Control-Allow-Origin",
              value: `https://${process.env.CODESPACE_NAME}-3000.github.dev`,
            },
          ]
        : [],
    },
  ],

  experimental: {
    serverActions: {
      allowedOrigins: [
        "https://ubiquitous-cod-q9p47457wqqc54w-3000.app.github.dev",
      ],
    },
  },

  images: {
    remotePatterns: [
      new URL(`${SupabasePaths.IMAGES}/**`),
      new URL(`https://lh3.googleusercontent.com/**`),
      new URL(`https://avatars.githubusercontent.com/**`),
    ],
  },
};

// export default nextConfig;
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
