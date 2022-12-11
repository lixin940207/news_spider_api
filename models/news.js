const BaseSchema = require('./base_schema');
const mongoose = require('mongoose');


const NewsModel = mongoose.model('news', new BaseSchema(
    {
        platform: {type: String, required: true}
    }, {
        timestamps: true
    }));


// async function getNewsById(id) {
//     return await NewsModel.findById(id);
// }
//
// async function getNewsByHref(href) {
//     return await NewsModel.findOne({articleHref: href});
// }

// async function getLatestNews() {
//     const latestUpdatedTime =  (await NewsModel.findOne({}).select('updatedAt').lean().sort({updatedAt: -1})).updatedAt;
//     return await NewsModel.find({updatedAt: latestUpdatedTime}).sort({ranking: 1});
// }

// async function getLatestNews(plateforms) {
//     const latestUpdatedTime = (await NewsModel.findOne({}).select('updatedAt').lean().sort({updatedAt: -1})).updatedAt;
//     return await NewsModel
//         .find({
//             platform: plateforms,
//             updatedAt: {$gt: new Date(latestUpdatedTime.getTime() - 1000 * 60 * 5)}
//         })
//         .sort({ranking: 1})
// }

async function getFranceNews(offset, limit, platforms) {
    // const latestUpdatedTime =  (await NewsModel.findOne({}).select('updatedAt').lean().sort({updatedAt: -1})).updatedAt;
    const filter = {
        platform: platforms,
        categories: {$nin: ['China', 'Tech']},
        displayOrder: {$exists: true}
    };
    return {
        totalNum: await NewsModel.countDocuments(filter),
        news: await NewsModel
            .find(filter)
            .sort({publishTime: -1})
            .skip(Number(offset))
            .limit(Number(limit))
    }
}

async function getWorldNews(plateforms, offset, limit) {
    // const latestUpdatedTime =  (await NewsModel.findOne({}).select('updatedAt').lean().sort({updatedAt: -1})).updatedAt;
    const filter = {
        platform: plateforms,
        categories: {$nin: ['China', 'Tech']},
        displayOrder: {$exists: true}
    };
    return {
        totalNum: await NewsModel.countDocuments(filter),
        news: await NewsModel
            .find(filter)
            .sort({publishTime: -1})
            .skip(Number(offset))
            .limit(Number(limit))
    }
}

async function getChinaNews(offset, limit) {
    return {
        totalNum: await NewsModel.countDocuments({categories: "China"}),
        news: await NewsModel
            .find({categories: "China"})
            .sort({publishTime: -1}).skip(Number(offset)).limit(Number(limit))
    }
}

async function getCovidNews(offset, limit) {
    return {
        totalNum: await NewsModel.countDocuments({categories: "Covid"}),
        news: await NewsModel
            .find({categories: "Covid"})
            .sort({publishTime: -1}).skip(Number(offset)).limit(Number(limit))
    }
}

async function getTechNews(offset, limit) {
    return {
        totalNum: await NewsModel.countDocuments({categories: "Tech"}),
        news: await NewsModel
            .find({categories: "Tech"})
            .sort({publishTime: -1}).skip(Number(offset)).limit(Number(limit))
    }
}

async function getWarNews(offset, limit) {
    return {
        totalNum: await NewsModel.countDocuments({categories: "Russia-Ukrainian War"}),
        news: await NewsModel
            .find({categories: "Russia-Ukrainian War"})
            .sort({publishTime: -1}).skip(Number(offset)).limit(Number(limit))
    }
}

async function getHotTopicsOfToday(count = 10) {
    const start = new Date();
    start.setDate(start.getDate() - 1);

    const topicDocs = await NewsModel
        .find({
                keywords: {$exists: true},
                publishTime: {$gte: start.toISOString()}
            },
            {
                keywords: 1
            });
    const topicCount = topicDocs
        .map(doc => doc._doc.keywords)
        .flat()
        .filter( keyword => keyword !== '')
        .reduce(function (map, word) {
            map[word] = (map[word] || 0) + 1;
            return map;
        }, Object.create(null));

    return Object.keys(topicCount)
        .sort(function(a,b){
            return topicCount[b]-topicCount[a];
        }).slice(0,count);
}


module.exports = {
    getChinaNews,
    getWorldNews,
    getFranceNews,
    getCovidNews,
    getTechNews,
    getWarNews,
    getHotTopicsOfToday,
}
