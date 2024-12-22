import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL.split("//")[1],
      },
    ],
    // domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.split("//")[1]],
  },
};

export default nextConfig;
