require('dotenv').config()
const retryFetch = require('../utils/retry-fetch')

const queryAPI = async (query) => {
    const response = await retryFetch(query, {}, 20, 3000)
    const responseData = await response.json()
    return responseData
}

const getCurrencies = async () => {
    const queryUrl = `https://api.exchangerate.host/symbols`
    const searchResponse = await queryAPI(queryUrl)
    return Object.keys(searchResponse['motd']).length === 0 ? null : searchResponse;
}

const getConversionPrice = async (currency) => {
    const queryUrl = `https://api.exchangerate.host/convert?from=USD&to=${currency}`
    const currencyPrice = await queryAPI(queryUrl)
    return Object.keys(currencyPrice).length === 0 ? null : currencyPrice;
}

module.exports = {
    getCurrencies,
    getConversionPrice
}