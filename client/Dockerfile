FROM node:18.5.0-alpine
WORKDIR /app

COPY . ./
RUN npm ci

CMD ["npm", "start"]

