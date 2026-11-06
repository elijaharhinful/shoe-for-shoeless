import type { NextConfig } from "next";

// Single Next.js config. Server secrets (MONGODB_URI, PAYSTACK_SECRET_KEY) are read
// from process.env at runtime and must never be listed under `env`, which inlines
// values into the client bundle.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
