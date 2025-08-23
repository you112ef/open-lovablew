// Cloudflare Pages Worker for Next.js API routes
export default {
  async fetch(request, env, ctx) {
    // Handle API routes
    const url = new URL(request.url);
    
    if (url.pathname.startsWith('/api/')) {
      // This will be handled by Next.js API routes
      return env.ASSETS.fetch(request);
    }
    
    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};