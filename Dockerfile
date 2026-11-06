# Multi-stage Dockerfile for Google Cloud Run (Full-Stack Unified Container)
FROM node:20-alpine AS builder

WORKDIR /app

# Build Client
COPY client/package*.json ./client/
RUN cd client && npm install
COPY client/ ./client/
RUN cd client && npm run build

# Stage 2: Production Server
FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install --omit=dev

COPY server/ ./server/
COPY --from=builder /app/client/dist ./client/dist

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server/server.js"]

