# syntax=docker/dockerfile:1

# Build Stage
FROM node:24-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS build
WORKDIR /repo

# Enable corepack for pnpm
RUN corepack enable

# Install build tools early - cached unless base image changes
RUN apk add --no-cache python3 make g++ libc6-compat vips-dev

# Copy only manifests first for dependency caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/main/package.json ./apps/main/
COPY packages/ ./packages/
COPY services/ ./services/

# Install dependencies with persistent pnpm store cache
ENV npm_config_nodedir=/usr/local
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --filter ./apps/main... --frozen-lockfile

# Copy source and build
COPY apps/main ./apps/main
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN cd apps/main && pnpm run build

# Remove unoptimized blog images
RUN rm -rf /repo/apps/main/.output/public/blog-images

# Final Stage
FROM node:24-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS final
WORKDIR /app

COPY --from=build /repo/apps/main/.output/ ./

EXPOSE 3000
CMD ["node", "/app/server/index.mjs"]