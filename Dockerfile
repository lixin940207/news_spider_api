FROM node:16.13.2-slim
ENV ENV=PRODUCTION

LABEL name="news_spider_api"
LABEL version=$Version

RUN mkdir /news_spider_api
COPY ./package.json /news_spider_api/
COPY ./package-lock.json /news_spider_api/

WORKDIR /news_spider_api

RUN npm install --production

COPY . .

RUN chown -Rh $user:$user /news_spider_api

USER $user

EXPOSE 5000

CMD ["node", "bin/www"]
