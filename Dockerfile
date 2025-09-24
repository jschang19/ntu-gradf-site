# Multi-stage build optimization
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# Install all dependencies (including dev dependencies for build)
FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the application
FROM dependencies AS build
COPY . .
RUN pnpm run build

# Production dependencies only
FROM base AS production-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Final production image
FROM base AS production
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY package.json pnpm-lock.yaml ./
CMD ["pnpm", "run", "start"]