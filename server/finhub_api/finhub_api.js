require('dotenv').config()
const retryFetch = require('../utils/retry-fetch')
const fns = require('date-fns')

const apiKey = process.env.FINHUB_API_KEY

const queryFinhub = async (query) => {
    const response = await retryFetch(`${query}&token=${apiKey}`, {}, 20, 3000)
    const responseData = await response.json()
    return responseData
}

const searchCompany = async () => {
    const queryUrl = `https://finnhub.io/api/v1//stock/symbol?exchange=US`
    const searchResponse = await queryFinhub(queryUrl)
    return searchResponse.count === 0 ? null : searchResponse;
}

const getFinhubCompanyInfo = async (companyTicker) => {
    const queryUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${companyTicker}`
    const CompanyInfo = await queryFinhub(queryUrl)
    return Object.keys(CompanyInfo).length === 0 ? null : CompanyInfo;
}

const getFinhubMarketNews = async () => {
    const queryUrl = 'https://finnhub.io/api/v1//news?category=general'
    const marketNews = await queryFinhub(queryUrl)
    return marketNews.length === 0 ? null : marketNews;
}

const getFinhubCompanyNews = async (companyTicker) => {
    const currentDay = fns.format(Date.now(), 'yyyy-MM-dd')
    const monthAgo = fns.format(fns.subMonths(Date.now(), 1), 'yyyy-MM-dd')
    const queryUrl = `https://finnhub.io/api/v1/company-news?symbol=${companyTicker}&from=${monthAgo}&to=${currentDay}`
    const CompanyNews = await queryFinhub(queryUrl)
    return CompanyNews.length === 0 ? null : CompanyNews;
}

const getFinhubCandles = async (companyTicker, resolution) => {
    const currentDay = fns.getUnixTime(Date.now())
    let finhubResolution
    let startDate

    switch (resolution) {
        case 'day':
            startDate = fns.getUnixTime(fns.subBusinessDays(Date.now(), 1))
            finhubResolution = '15'
            break;
        case 'week':
            startDate = fns.getUnixTime(fns.subWeeks(Date.now(), 1))
            finhubResolution = '60'
            break;
        case 'month':
            startDate = fns.getUnixTime(fns.subMonths(Date.now(), 1))
            finhubResolution = 'D'
            break;
        case 'year':
            startDate = fns.getUnixTime(fns.subYears(Date.now(), 1))
            finhubResolution = 'W'
            break;
        default:
            break;
    }

    const queryUrl = `https://finnhub.io/api/v1/stock/candle?symbol=${companyTicker}&resolution=${finhubResolution}&from=${startDate}&to=${currentDay}`
    const Candles = await queryFinhub(queryUrl)

    return Candles.length === 0 ? null : Candles
}

const getFinhubQuote = async (ticker) => {
    const queryUrl = `https://finnhub.io/api/v1/quote?symbol=${ticker}`
    const Quote = await queryFinhub(queryUrl)

    return Object.keys(Quote).length === 0 ? null : Quote;
}

const getFinhubFinancials = async (ticker) => {
    const queryUrl = `https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all`
    const financials = await queryFinhub(queryUrl)

    return Object.keys(financials).length === 0 ? null : financials;
}

module.exports = {
    getFinhubCompanyInfo,
    getFinhubMarketNews,
    getFinhubCompanyNews,
    getFinhubCandles,
    getFinhubQuote,
    getFinhubFinancials,
    searchCompany
}