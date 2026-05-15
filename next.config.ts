import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.supabase.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "d1yei2z3i6k35z.cloudfront.net" },
    ],
  },
};

export default nextConfig;
