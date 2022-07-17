const BaseSchema = require('./base_schema');
const mongoose = require('mongoose');


const NewsModel = mongoose.model('news', new BaseSchema(
    {
        platform: {type: String, required: true}
    }, {
        timestamps: true
    }));


async function getNewsById(id) {
    return await NewsModel.findById(id);
}

async function getNewsByHref(href) {
    return await NewsModel.findOne({articleHref: href});
}

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
        categories: {$nin: ['China']},
        displayOrder: {$exists: true}
    };
    return {
        totalNum:await NewsModel.countDocuments(filter),
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
        categories: {$nin: ['China']},
        displayOrder: {$exists: true}
    };
    return {
        totalNum:await NewsModel.countDocuments(filter),
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


module.exports = {
    getChinaNews,
    getWorldNews,
    getFranceNews,
    getCovidNews,
}
