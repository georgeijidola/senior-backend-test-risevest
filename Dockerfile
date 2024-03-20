FROM node:21.0.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
