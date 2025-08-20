/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: undefined,
  basePath: '',
  
  // Disable experimental features that might cause issues
  experimental: {},
  
  // Simple webpack config
  webpack: (config, { dev, isServer }) => {
    // Handle fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  }
}

module.exports = nextConfig