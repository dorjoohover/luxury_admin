import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    
  },
  env: {
    URL: 'http://72.62.196.155:3000/'
  }
};

export default nextConfig;
