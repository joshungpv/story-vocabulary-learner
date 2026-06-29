# =============================================================================
# Stage 1: Dependencies & Build
# =============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy lockfile & package manifest first for layer caching
COPY package-lock.json package.json ./

RUN npm ci

# Copy the rest of the source code
COPY . .

# Build: Vite bundles the React frontend → dist/assets/
#        esbuild bundles server.ts → dist/server.cjs (node target, external deps)
RUN npm run build

# =============================================================================
# Stage 2: Production image — minimal runtime
# =============================================================================
FROM node:22-alpine AS production

WORKDIR /app

# Copy only the build artifacts needed at runtime
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Health check: ensure the Express server is alive
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# ── Production entrypoint ────────────────────────────────────────────────────
# NODE_ENV=production signals server.ts to skip Vite middleware and serve static
# files from dist/ instead.
ENV NODE_ENV=production

CMD ["node", "dist/server.cjs"]
