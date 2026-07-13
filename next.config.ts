import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nekfqpfhxaegaqlwasre.supabase.co",
      },
    ],
  },
};

export default nextConfig;
