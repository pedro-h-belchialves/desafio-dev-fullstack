import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: ["api:5500", "localhost:5500"],
    },
  },
};

export default nextConfig;
