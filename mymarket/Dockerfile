# ---------- DEV ----------
FROM node:24-alpine@sha256:8e2c930fda481a6ec141fe5a88e8c249c69f8102fe98af505f38c081649ea749 AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]


# ---------- BUILD ----------
FROM node:24-alpine@sha256:8e2c930fda481a6ec141fe5a88e8c249c69f8102fe98af505f38c081649ea749 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .


RUN npx prisma generate

RUN npm run build


# ---------- PROD ----------
FROM node:24-alpine@sha256:8e2c930fda481a6ec141fe5a88e8c249c69f8102fe98af505f38c081649ea749 AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./


RUN npm install --omit=dev


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public


COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm","start"]