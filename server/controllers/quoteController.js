const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubQuote
    } = require('../external_APIs/finhub_api')

// @desc    Get price quote for company ticker
// @route   GET /api/v1/stock/quote/:ticker
// @access  Private
const getQuote = asyncWrapper( async (req, res, next) => {
    const { ticker } = req.params
    const tickerQuote = await getFinhubQuote(ticker.toUpperCase())

    if(!tickerQuote.c) return  next(createCustomError(`No quote could be found for ticker ${ticker}`, 404))

    return res.status(200).json(tickerQuote)
})

module.exports = {
    getQuote
} 