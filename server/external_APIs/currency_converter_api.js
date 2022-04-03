require('dotenv').config()
const retryFetch = require('../utils/retry-fetch')

const apiKey = process.env.CURRENCY_CONVERTER_API

const queryAPI = async (query) => {
    const response = await retryFetch(`${query}apiKey=${apiKey}`, {}, 20, 3000)
    const responseData = await response.json()
    return responseData
}

const getCurrencies = async () => {
    const queryUrl = `https://free.currconv.com/api/v7/currencies?`
    const searchResponse = await queryAPI(queryUrl)
    return Object.keys(searchResponse['results']).length === 0 ? null : searchResponse;
}

const getConversionPrice = async (currency) => {
    const queryUrl = `https://free.currconv.com/api/v7/convert?q=USD_${currency}&compact=ultra&`
    const currencyPrice = await queryAPI(queryUrl)
    return Object.keys(currencyPrice).length === 0 ? null : currencyPrice;
}

module.exports = {
    getCurrencies,
    getConversionPrice
}