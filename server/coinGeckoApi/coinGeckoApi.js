const retryFetch = require('../utils/retry-fetch')

const fetchCryptoInfo = async (symbol) => {
    const queryUrl = `https://api.coingecko.com/api/v3/coins/${symbol}`
    const response = await retryFetch(queryUrl, {}, 20, 3000)
    const responseData = await response.json()
    
    return responseData
}

module.exports = {
    fetchCryptoInfo
}