const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {getFinhubCompanyInfo, getFinhubFinancials} = require('../finhub_api/finhub_api')

// @desc    Returns list of all companies stored on MONGO DB
// @route   GET /api/v1/companys
// @access  Private
const getCompanys = asyncWrapper(async (req, res) => {
    const companys = await Company.find({})
    res.status(200).json(companys)
})

// @desc  Returns Company info from MONGO DB, if no company info is found on MONGO DB
//        fetches info from finhub and stores in MONGO DB then returns info
// @route   GET /api/v1/companys/:ticker
// @access  Private
const getCompanyInfo = asyncWrapper(async (req, res, next) => {
    const { ticker: companyTicker } = req.params

    const companyInfo = await getFinhubCompanyInfo(companyTicker)

    if(Object.keys(companyInfo).length === 0) return next(createCustomError(`No company with id : ${companyTicker}`, 404))
    
    const companyFinancials = await getFinhubFinancials(companyTicker.toLowerCase())

    const yearHigh = companyFinancials.metric['52WeekHigh']
    const yearLow = companyFinancials.metric['52WeekLow']
    const peRatio = companyFinancials.metric.peNormalizedAnnual

    return res.status(200).json({...companyInfo, yearHigh, yearLow, peRatio})
})

module.exports = {
    getCompanys,
    getCompanyInfo,
}