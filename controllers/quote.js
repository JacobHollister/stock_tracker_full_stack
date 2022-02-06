const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {
    getFinhubQuote
    } = require('../finhub_api/finhub_api')

const getQuote = asyncWrapper( async (req, res) => {
    const { ticker: companyTicker } = req.params
    const tickerQuote = await getFinhubQuote(companyTicker)
    return res.status(200).json(tickerQuote)
})

module.exports = {
    getQuote
} 