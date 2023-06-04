FROM node:18-alpine as builder
RUN apk --update add --no-cache  python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /app

COPY ./package.json .
COPY ./pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install

COPY . .

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

CMD ["npm", "run", "prod"]
