# --- Aşama 1: build ---
FROM node:24-alpine AS build
WORKDIR /uygulama
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Aşama 2: production ---
FROM node:24-alpine AS production
WORKDIR /uygulama
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --omit=dev
COPY --from=build /uygulama/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
