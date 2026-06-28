# Build Stage
FROM node:22-alpine AS build
WORKDIR /repo

# Enable corepack for pnpm
RUN corepack enable

# Install build tools early so they're cached
RUN apk add --no-cache python3 make g++ libc6-compat vips-dev

# Copy only manifests first for dependency caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/main/package.json ./apps/main/
COPY packages/ ./packages/
COPY services/ ./services/

# Install dependencies - this layer is cached unless lockfile/package.json changes
ENV npm_config_nodedir=/usr/local
RUN pnpm install --filter ./apps/main... --frozen-lockfile

# Now copy source code
COPY apps/main ./apps/main

# Build
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN cd apps/main && pnpm run build

# Remove unoptimized blog images
RUN rm -rf /repo/apps/main/.output/public/blog-images

# Final Stage
FROM node:22-alpine AS final
WORKDIR /app

# Only copy built output
COPY --from=build /repo/apps/main/.output/ ./

EXPOSE 3000
CMD ["node", "/app/server/index.mjs"]