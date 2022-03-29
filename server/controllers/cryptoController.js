const { fetchCryptoInfo } = require('../external_APIs/coin_gecko_api')
const asyncWrapper = require('../middleware/async')

// @desc    Fetching crypto currency information and returns it  
// @route   GET /api/v1/crypto/:symbol
// @access  Private
const getCryptoInfo = asyncWrapper(async (req, res, next) => {
    const { symbol } = req.params
    
    const cryptoInfo = await fetchCryptoInfo(symbol)
    
    if(Object.keys(cryptoInfo).length === 0) return next(createCustomError(`No crypto with symbol : ${symbol}`, 404))
    
    const name = cryptoInfo["name"]
    const shortName = cryptoInfo["symbol"]
    const dayLow = cryptoInfo["market_data"]["low_24h"]["usd"]
    const dayHigh = cryptoInfo["market_data"]["high_24h"]["usd"]
    const website = cryptoInfo['links']['homepage'][0]
    const github = cryptoInfo['links']['repos_url']["github"][0]
    const image = cryptoInfo["image"]["small"]
    const creationDate = cryptoInfo["genesis_date"]
    const rank = cryptoInfo["market_cap_rank"]
    const currentPrice = cryptoInfo["market_data"]["current_price"]["usd"]
    const allTimeHigh = cryptoInfo["market_data"]["ath"]['usd']
    const marketCap = cryptoInfo["market_data"]["market_cap"]["usd"]
    const change = cryptoInfo["market_data"]["price_change_24h_in_currency"]["usd"]
    const changePercentage = cryptoInfo["market_data"]["price_change_percentage_24h_in_currency"]["usd"]

    return res.status(200).json({changePercentage, change, name, shortName, dayLow, dayHigh, website, github, image, creationDate, rank, currentPrice, allTimeHigh, marketCap})
})

module.exports = {
    getCryptoInfo
}