# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:18-alpine
WORKDIR /app

# Install necessary certificates and security packages
RUN apk update && \
    apk add --no-cache ca-certificates openssl tini && \
    update-ca-certificates

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=https://medicloud.co/api
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV SSL_CERT_DIR=/etc/ssl/certs

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]