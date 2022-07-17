const News = require('../models/news');

async function getLatestNews() {
      return await News.getLatestNews();
}

async function getLatestFranceNews(offset, limit, platforms = ['LeFigaro', 'LeMonde', 'LeParisien', 'France24', 'BFM']) {
      return await News.getFranceNews(offset, limit, platforms);
}

async function getLatestWorldNews(offset, limit) {
      return await News.getWorldNews(['BBC', 'NYTimes'], offset, limit);
}

async function getLatestChinaNews(offset, limit) {
      return await News.getChinaNews(offset, limit);
}

async function getLatestCovidNews(offset, limit) {
      return await News.getCovidNews(offset, limit);
}

module.exports = {
      getLatestNews,
      getLatestFranceNews,
      getLatestWorldNews,
      getLatestChinaNews,
      getLatestCovidNews
}


