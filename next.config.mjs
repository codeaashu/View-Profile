import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

const isDev = process.env.NODE_ENV === "development";

// Conditionally apply the hydration overlay
const config = isDev
  ? withHydrationOverlay({
      appRootSelector: "main",
    })(nextConfig) // apply overlay only in development
  : nextConfig; // use normal config in production

export default config;
