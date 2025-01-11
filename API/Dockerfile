FROM node:18-alpine as base

WORKDIR /home/node/app

COPY package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]

FROM base as production

ENV NODE_ENV=production

ENV NODE_PATH=./build

RUN npm run build --production