FROM node:16.13.2-slim
ENV NODE_ENV=production

ARG Version=1.0.0

LABEL name="news_spider_api"
LABEL version=$Version

RUN mkdir /news_spider_api
COPY ./package.json /news_spider_api/
COPY ./package-lock.json /news_spider_api/

WORKDIR /news_spider_api

RUN npm install --production

COPY --chown=node:node . .

USER node

EXPOSE 5000

CMD ["node", "bin/www"]