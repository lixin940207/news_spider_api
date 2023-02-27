const express = require('express');
const router = express.Router();
const NewsService = require('../services/news_service');


router.get('/latest_france_news', function (req, res, next) {
    (async () => {
        if (req.query.platforms !== undefined) {
            return await NewsService.getLatestFranceNews(req.query.offset, req.query.limit, req.query.platforms);
        } else {
            return await NewsService.getLatestFranceNews(req.query.offset, req.query.limit)
        }
    })()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/latest_world_news', function (req, res, next) {
    (async () => await NewsService.getLatestWorldNews(req.query.offset, req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/latest_china_news', function (req, res, next) {
    (async () =>
        await NewsService.getLatestChinaNews(req.query.offset, req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/latest_covid_news', function (req, res, next) {
    (async () =>
        await NewsService.getLatestCovidNews(req.query.offset, req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/latest_tech_news', function (req, res, next) {
    (async () =>
        await NewsService.getLatestTechNews(req.query.offset, req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/latest_finance_news', function (req, res, next) {
    (async () =>
        await NewsService.getLatestFinanceNews(req.query.offset, req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/latest_war_news', function (req, res, next) {
    (async () =>
        await NewsService.getLatestWarNews(req.query.offset, req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/topics_of_today', function (req, res, next) {
    (async () =>
        await NewsService.getHotTopicsOfToday(req.query.count))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/topic_news', function (req, res, next) {
    (async () =>
        await NewsService.getNewsByTopic(req.query.topic, req.query.offset, req.query.count))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});

router.get('/search_news', function (req, res, next) {
    (async () =>
        await NewsService.getSearchNews(
            req.query.lang,
            req.query.input,
            req.query.offset,
            req.query.limit))()
        .then(value => {
            res.data = value;
            res.json(res.data);
            next();
        })
        .catch()
});


module.exports = router;
