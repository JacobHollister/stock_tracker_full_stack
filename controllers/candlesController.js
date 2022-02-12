const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubCandles
    } = require('../finhub_api/finhub_api')

// @desc    Get candle information for specfic ticker
// @route   GET /api/v1/stock/candles
// @access  Private
const getCandles = asyncWrapper(async (req, res, next) => {
    const {ticker, resolution} = req.query
    const candleData = await getFinhubCandles(ticker, resolution)
    if(candleData.s === "ok") {
        return res.status(200).json(candleData)
    } else {
        return next(createCustomError(`External API error: ${candleData.s}`, 404))
    }
})

module.exports = getCandles