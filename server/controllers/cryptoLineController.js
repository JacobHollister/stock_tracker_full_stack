const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getCryptoLineData
    } = require('../finhub_api/finhub_api')

// @desc    Get candle {close and time} information for specfic ticker (used for line graphs)
// @route   GET /api/v1/stock/line
// @access  Private
const getCryptoLine = asyncWrapper(async (req, res, next) => {
    const {cryptoSymbol, resolution} = req.query

    const candleData = await getCryptoLineData(cryptoSymbol, resolution)

    if(candleData.s === "ok") {
        const lineData = candleData.c
        const dateData = candleData.t

        return res.status(200).json({data: lineData, date: dateData})
    } else {
        return next(createCustomError(`External API error: ${candleData.s}`, 404))
    }

})

module.exports = getCryptoLine