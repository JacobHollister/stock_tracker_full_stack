const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubCandles
    } = require('../finhub_api/finhub_api')


const getCandles = asyncWrapper(async (req, res) => {
    const {ticker, resolution} = req.query
    const candleData = await getFinhubCandles(ticker, resolution)
    return res.status(200).json(candleData)
})

module.exports = getCandles