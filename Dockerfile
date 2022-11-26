FROM node:16.13.2-slim
ENV ENV=PRODUCTION

LABEL name="news_spider_api"

RUN mkdir /news_spider_api
COPY ./package.json /news_spider_api/
COPY ./yarn.lock /news_spider_api/

WORKDIR /news_spider_api

RUN yarn cache clean \
    && yarn install --network-concurrency 1 --production \
    && yarn cache clean \

COPY . .

RUN chown -Rh $user:$user /news_spider_api

USER $user

EXPOSE 5000

CMD ["node", "bin/www"]
