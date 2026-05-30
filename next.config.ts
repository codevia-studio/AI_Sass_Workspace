import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["drizzle-kit", "pg", "postgres"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
