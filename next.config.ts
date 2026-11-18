import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Album artwork for the "now playing" bar, served from Apple's CDN.
    remotePatterns: [new URL("https://is1-ssl.mzstatic.com/image/thumb/**")],
  },
};

export default nextConfig;
