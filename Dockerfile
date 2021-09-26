# syntax=docker/dockerfile:1
FROM node:alpine AS builder
WORKDIR /home/workspace/linguo-bot
COPY . ./
RUN yarn install
RUN yarn build:prod

FROM node:alpine
WORKDIR /home/workspace/linguo-bot
COPY --from=builder /home/workspace/linguo-bot/build ./src
COPY --from=builder /home/workspace/linguo-bot/package.json ./package.json
# Only for local development
# COPY --from=builder /home/workspace/linguo-bot/.env ./.env
RUN npm install
CMD ["node", "src/index.js"]
