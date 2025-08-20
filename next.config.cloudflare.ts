import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Configuration for Cloudflare Pages with @cloudflare/next-on-pages
  experimental: {
    serverComponentsExternalPackages: ['@e2b/code-interpreter']
  },
  // Image optimization disabled for Cloudflare Pages
  images: {
    unoptimized: true
  },
  // Ensure API routes work with Cloudflare Workers runtime
  webpack: (config: any) => {
    config.externals = config.externals || [];
    config.externals.push({
      '@e2b/code-interpreter': '@e2b/code-interpreter'
    });
    return config;
  }
};

export default nextConfig;