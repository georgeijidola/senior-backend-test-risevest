
FROM node:21.0.0-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Final production image
FROM node:21.0.0-alpine

WORKDIR /app
COPY --from=build /app .

CMD ["npm", "start"]
