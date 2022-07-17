const express = require('express');
const router = express.Router();
const NewsService = require('../services/news_service');


router.get('/latest_france_news', function(req, res, next) {
    (async ()=>{
        // console.log('received '+ req.query.offset+','+req.query.limit);
        if (req.query.platforms!== undefined) {
            return await NewsService.getLatestFranceNews(req.query.offset, req.query.limit, req.query.platforms);
        }else{
            return await NewsService.getLatestFranceNews(req.query.offset, req.query.limit)
        }
    })()
        .then(value => {
            res.data = value;
            res.json(res.data);
            // console.log(res.data.news.map(item=>item.title.ori + item._id));
        })
        .catch()
});

router.get('/latest_world_news', function(req, res, next) {
    (async ()=>{
        return await NewsService.getLatestWorldNews(req.query.offset, req.query.limit);
    })()
        .then(value => {
            res.data = value;
            res.json(res.data);
        })
        .catch()
});

router.get('/latest_china_news', function(req, res, next) {
    (async ()=>{
        return await NewsService.getLatestChinaNews(req.query.offset, req.query.limit);
    })()
        .then(value => {
            res.data = value;
            res.json(res.data);
        })
        .catch()
});

router.get('/latest_covid_news', function(req, res, next) {
    (async ()=>{
        return await NewsService.getLatestCovidNews(req.query.offset, req.query.limit);
    })()
        .then(value => {
            res.data = value;
            res.json(res.data);
        })
        .catch()
});

module.exports = router;
