FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=4000
ENV API_URL=http://127.0.0.1:4000
ENV NEXT_PUBLIC_SITE_URL=https://mygent.uz

EXPOSE 3000

CMD ["npm", "start"]

