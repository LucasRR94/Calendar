From node:14.21.3-bullseye

WORKDIR /app

COPY package* .

RUN yarn

RUN yarn add -g @vue/cli-service

EXPOSE 3000

RUN yarn global add @vue/cli
