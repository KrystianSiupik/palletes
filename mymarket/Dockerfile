# ---------- DEV ----------
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]


# ---------- BUILD ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .


RUN npx prisma generate

RUN npm run build


# ---------- PROD ----------
FROM node:20-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./


RUN npm ci --omit=dev


COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public


COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm","start"]