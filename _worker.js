// Cloudflare Worker for API routes
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      // For now, return a simple response
      // In production, you would implement actual API logic here
      return new Response(JSON.stringify({
        success: false,
        error: 'API routes are not implemented in static export mode'
      }), {
        status: 501,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Handle static files
    return env.ASSETS.fetch(request);
  }
};