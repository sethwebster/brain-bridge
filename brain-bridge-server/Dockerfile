FROM node:18-alpine as builder
RUN apk --update add --no-cache  python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /app
ARG DATABASE_URL
COPY ./brain-bridge-server/package.json .
COPY ./brain-bridge-server/pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install
RUN export
COPY ./brain-bridge-server/ .
COPY ./brain-bridge-t3/prisma/schema.prisma ./prisma/schema.prisma
RUN pnpm install
RUN pnpm run build

# FROM node:18-alpine as final
# RUN apk --update add --no-cache  python3 make g++ && rm -rf /var/cache/apk/*

# WORKDIR /app
# ENV PYTHON /usr/bin/python
# RUN export
# COPY --from=builder ./app/dist ./dist
# COPY package.json .
# COPY package-lock.json .
# RUN npm install

CMD ["npm", "run", "start"]
