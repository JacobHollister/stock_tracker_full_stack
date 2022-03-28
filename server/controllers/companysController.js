const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {getFinhubCompanyInfo, getFinhubFinancials, searchCompany} = require('../finhub_api/finhub_api')

// @desc    Returns list of all companies stored on MONGO DB
// @route   GET /api/v1/companys
// @access  Private
const getCompanys = asyncWrapper(async (req, res) => {
    const companys = await Company.find({})
    res.status(200).json(companys)
})

// @desc fetches info from finhub then returns info
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

const companySearch = asyncWrapper( async (req, res, next) => {
    const {q} = req.query
    
    const usCompanies = await searchCompany(q)
    
    const filteredResults = usCompanies.filter((company) => ((company.description.includes(q.toUpperCase()) || company.symbol.includes(q.toUpperCase())) && !company.symbol.includes('.')))
    
    if(filteredResults.length === 0) return  next(createCustomError(`No company could be found for q ${q}`, 404))

    return res.status(200).json(filteredResults)
})

module.exports = {
    getCompanys,
    getCompanyInfo,
    companySearch
}