# syntax=docker/dockerfile:1

FROM node:24-alpine@sha256:a0b9bf06e4e6193cf7a0f58816cc935ff8c2a908f81e6f1a95432d679c54fbfd AS build
WORKDIR /repo

RUN corepack enable

RUN apk add --no-cache python3 make g++ libc6-compat

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps/silly/package.json ./apps/silly/
COPY packages/ ./packages/
COPY services/ ./services/

ENV npm_config_nodedir=/usr/local
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --filter ./apps/silly... --frozen-lockfile

COPY apps/silly ./apps/silly
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN cd apps/silly && pnpm run build

FROM nginx:alpine
COPY --from=build /repo/apps/silly/dist/ /usr/share/nginx/html
COPY --from=build /repo/apps/silly/nginx.conf /etc/nginx/conf.d/default.conf