const fetch = require('node-fetch')
require('dotenv').config()

const apiKey = process.env.FINHUB_API_KEY

const getFinhubCompanyInfo = async (companyTicker) => {
    const finhubResponse = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${companyTicker}&token=${apiKey}`)
    const finhubCompanyInfo = await finhubResponse.json()
    return Object.keys(finhubCompanyInfo).length === 0 ? null : finhubCompanyInfo;
}

module.exports = {
    getFinhubCompanyInfo
}