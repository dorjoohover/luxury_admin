import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
    
  },
  env: {
    URL: 'http://localhost:3000/'
  }
};

export default nextConfig;
