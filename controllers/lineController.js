const fns = require('date-fns')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubCandles
    } = require('../finhub_api/finhub_api')

// @desc    Get candle {close and time} information for specfic ticker (used for line graphs)
// @route   GET /api/v1/stock/line
// @access  Private
const getLineData = asyncWrapper(async (req, res, next) => {
    const {ticker, resolution} = req.query

    const candleData = await getFinhubCandles(ticker, resolution)

    if(candleData.s === "ok") {
        const lineData = candleData.c
        const timeFormatString = formatTimeString(req.query.resolution)
        
        const labelData = candleData.t.map( (time) => {
            return fns.format(fns.fromUnixTime(time), timeFormatString)
        })
        
        return res.status(200).json({data: lineData, labels: labelData})
    } else {
        return next(createCustomError(`External API error: ${candleData.s}`, 404))
    }

})

function formatTimeString(resolution) { 
    switch (resolution) {
        case "day":
            return 'ccc p'
        case 'week':
            return 'ccc eo h aaaa'
        // default: Month or Year
        default:
            return 'LLLL eo'
    }
}

module.exports = getLineData