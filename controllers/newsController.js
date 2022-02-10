const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubMarketNews,
    getFinhubCompanyNews
    } = require('../finhub_api/finhub_api')

const getNews = asyncWrapper( async (req, res) => {
    const marketNews = await getFinhubMarketNews()
    return res.status(200).json(marketNews)
})

const getCompanyNews = asyncWrapper( async (req, res) => {
    const { ticker: companyTicker } = req.params
    const companyNews = await getFinhubCompanyNews(companyTicker)
    return res.status(200).json(companyNews)
})

module.exports = {
    getNews,
    getCompanyNews
}