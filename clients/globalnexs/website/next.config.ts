import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "globalnexs.com" },
    ],
  },
};

export default nextConfig;
