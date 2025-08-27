FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install dependencies (dev + prod)
RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js
RUN npm run build


FROM node:18-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

USER node

CMD ["npm", "start"]
