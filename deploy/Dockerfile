FROM node:16-alpine as builder

WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com

#RUN corepack enable
#RUN corepack prepare pnpm@7.32.1 --activate


COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --registry https://registry.npmmirror.com

COPY . .
RUN pnpm build

FROM nginx:stable-alpine

COPY deploy/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
