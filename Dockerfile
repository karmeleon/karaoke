# base off of official node container
FROM node:12

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

EXPOSE 9000

CMD ["yarn", "serve"]
