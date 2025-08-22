# Dockerfile for Open Lovable PWA
# Multi-stage build for optimal production deployment

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install necessary tools
RUN apk add --no-cache \
    curl \
    openssl \
    && rm -rf /var/cache/apk/*

# Copy built application
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx-pwa.conf /etc/nginx/conf.d/default.conf

# Create SSL directory
RUN mkdir -p /etc/ssl/certs /etc/ssl/private

# Generate self-signed certificate for development
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/open-lovable.key \
    -out /etc/ssl/certs/open-lovable.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=open-lovable.local"

# Create nginx user
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Create health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]