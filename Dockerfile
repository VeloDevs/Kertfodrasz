FROM node:24-bookworm-slim AS build
COPY --from=oven/bun:1 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app

COPY package.json bun.lock .npmrc ./
RUN bun install --frozen-lockfile
COPY . .

RUN bun run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    NO_INDEX=true
COPY --from=build --chown=node:node /app/build ./build
COPY --from=build --chown=node:node /app/package.json ./package.json
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "build/index.js"]
