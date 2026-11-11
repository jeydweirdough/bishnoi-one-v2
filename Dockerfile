# syntax=docker/dockerfile:1
# Builds ONE Bishnoi One application as a standalone Next.js server (used by Coolify).
#   docker build --build-arg APP=inventory -t bishnoi-inventory .
#   docker run -p 3000:3000 -e DATABASE_URL=... bishnoi-inventory
ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base
RUN apk add --no-cache libc6-compat
WORKDIR /repo
ENV NEXT_TELEMETRY_DISABLED=1 TURBO_TELEMETRY_DISABLED=1

# Keep only the app and the workspace packages it depends on.
FROM base AS prune
ARG APP
RUN test -n "$APP" || (echo "Pass --build-arg APP=<app id>" && exit 1)
COPY . .
RUN npx --yes turbo@2.11.10 prune @bishnoi/app-${APP} --docker

FROM base AS build
ARG APP
COPY --from=prune /repo/out/json/ .
RUN npm ci
COPY --from=prune /repo/out/full/ .
ENV NEXT_OUTPUT=standalone
RUN npx turbo run build --filter=@bishnoi/app-${APP}

FROM node:${NODE_VERSION} AS runner
ARG APP
ENV APP=${APP} NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build --chown=nextjs:nodejs /repo/apps/${APP}/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
# If an app adds a public/ folder, also copy: /repo/apps/${APP}/public -> ./apps/${APP}/public
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node apps/$APP/server.js"]
