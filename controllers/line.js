const fns = require('date-fns')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubCandles
    } = require('../finhub_api/finhub_api')
const { default: getTime } = require('date-fns/getTime')


const getLineData = asyncWrapper(async (req, res) => {
    const {ticker, resolution} = req.query
    const candleData = await getFinhubCandles(ticker, resolution)
    
    const lineData = candleData.c

    const timeFormatString = formatTimeString(req.query.resolution)
    const labelData = candleData.t.map( (time) => {
        return fns.format(fns.fromUnixTime(time), timeFormatString)
    })
    
    return res.status(200).json({data: lineData, labels: labelData})
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