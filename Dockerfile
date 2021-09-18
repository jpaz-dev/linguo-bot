# syntax=docker/dockerfile:1
FROM node:alpine
COPY . /home/workspace/linguo-bot
WORKDIR /home/workspace/linguo-bot
RUN yarn install
CMD ["yarn", "start"]
