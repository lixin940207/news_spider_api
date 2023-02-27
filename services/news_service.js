const News = require('../models/news');

async function getLatestFranceNews(offset, limit) {
      return await News.getFranceNews(offset, limit);
}

async function getLatestWorldNews(offset, limit) {
      return await News.getWorldNews(offset, limit);
}

async function getLatestChinaNews(offset, limit) {
      return await News.getChinaNews(offset, limit);
}

async function getLatestCovidNews(offset, limit) {
      return await News.getCovidNews(offset, limit);
}

async function getLatestTechNews(offset, limit) {
      return await News.getTechNews(offset, limit);
}

async function getLatestFinanceNews(offset, limit) {
      return await News.getFinanceNews(offset, limit);
}

async function getLatestWarNews(offset, limit) {
      return await News.getWarNews(offset, limit);
}

async function getHotTopicsOfToday(count) {
      return await News.getHotTopicsOfToday(count);
}

async function getNewsByTopic(topic, offset, limit) {
      return await News.getNewsByTopic(topic, offset, limit);
}

async function getSearchNews(lang, input, offset, limit) {
      return await News.getSearchNews(lang, input, offset, limit);
}

module.exports = {
      getLatestFranceNews,
      getLatestWorldNews,
      getLatestChinaNews,
      getLatestCovidNews,
      getLatestTechNews,
      getLatestFinanceNews,
      getLatestWarNews,
      getHotTopicsOfToday,
      getNewsByTopic,
      getSearchNews,
}


