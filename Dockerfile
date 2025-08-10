FROM node:lts-alpine AS base
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
RUN pnpm install

FROM build-deps AS build
COPY . .
RUN pnpm build

FROM ghcr.io/static-web-server/static-web-server:2 AS runtime
COPY --from=build /app/dist /app/dist
ENV SERVER_LOG_LEVEL=debug
ENV SERVER_ROOT=/app/dist
EXPOSE 80
