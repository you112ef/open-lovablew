# Cloudflare Pages Settings

## Environment Variables

Set the following environment variables in your Cloudflare Pages dashboard:

### Required AI API Keys (at least one must be configured)

1. **OPENAI_API_KEY**
   - Get from: https://platform.openai.com/api-keys
   - Used for: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo models

2. **ANTHROPIC_API_KEY**
   - Get from: https://console.anthropic.com/
   - Used for: Claude Sonnet, Claude Opus models

3. **GROQ_API_KEY**
   - Get from: https://console.groq.com/
   - Used for: Llama 3, Mixtral models

### Optional Settings

4. **NEXT_PUBLIC_API_URL**
   - Default: `/api` (uses relative API routes)
   - Set to full URL if using external API

## Build Settings

- **Framework preset**: Next.js
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node.js version**: 18.x or higher

## Domain Settings

- **Custom domain**: Configure as needed
- **HTTPS**: Enabled by default
- **Redirects**: Configure for SPA routing

## Performance Settings

- **Auto Minify**: Enable for JS, CSS, HTML
- **Browser Cache TTL**: 4 hours
- **Edge Cache TTL**: 4 hours

## Security Headers

The following headers are automatically configured:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000; includeSubDomains

## Troubleshooting

### Common Issues

1. **API Keys Not Working**
   - Verify API keys are correctly set in environment variables
   - Check API key permissions and quotas
   - Ensure at least one AI service is configured

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific errors

3. **Runtime Errors**
   - Check browser console for client-side errors
   - Review server logs for API errors
   - Verify environment variables are accessible

### Support

For issues with:
- **Cloudflare Pages**: Check Cloudflare documentation
- **AI APIs**: Contact respective service providers
- **Application**: Check GitHub issues or create new one