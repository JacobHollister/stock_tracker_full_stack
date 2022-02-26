const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubMarketNews,
    getFinhubCompanyNews
    } = require('../finhub_api/finhub_api')

// @desc    Get news
// @route   GET /api/v1/news
// @access  Private
const getNews = asyncWrapper( async (req, res, next) => {
    const {page} = req.query

    const marketNews = await getFinhubMarketNews()
    
    if(!marketNews) next(createCustomError(`External API error`, 404))

    return res.status(200).json(marketNews.slice(page * 10, page * 10 + 10))
})

// @desc    Get company specific news   
// @route   GET /api/v1/news/:ticker
// @access  Private
const getCompanyNews = asyncWrapper( async (req, res, next) => {
    const { ticker } = req.params
    const {page} = req.query

    const companyNews = await getFinhubCompanyNews(ticker)

    if(!companyNews) return  next(createCustomError(`No news could be found for ticker ${ticker}`, 404))

    return res.status(200).json(companyNews.slice(page * 10, page * 10 + 10))
})

module.exports = {
    getNews,
    getCompanyNews
}