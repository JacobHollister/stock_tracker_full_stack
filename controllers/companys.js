
const Company = require('../models/companys')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {getFinhubCompanyInfo} = require('../finhub_api/finhub_api')

// Returns list of all companies on MONGO DB
const getCompanys = asyncWrapper(async (req, res) => {
    const companys = await Company.find({})
    res.status(200).json(companys)
})

// Returns Company info from MONGO DB, if no company info is found on MONGO DB
// fetches info from finhub and stores in MONGO DB then returns info
const getCompanyInfo = asyncWrapper(async (req, res, next) => {
    const { ticker: companyTicker } = req.params
    const companyInfo = await Company.findOne({ticker: companyTicker})
    // if no company info is found on MONGO DB fetches info from finhub and stores in MONGO DB
    if (!companyInfo){
        const newCompanyInfo = await getFinhubCompanyInfo(companyTicker)
        if(!newCompanyInfo) {
            return next(createCustomError(`No company with id : ${companyTicker}`, 404))
        }
        const createCompanyInfo = await Company.create(newCompanyInfo)
        return res.status(200).json(createCompanyInfo)
    }
    return res.status(200).json(companyInfo)
})

module.exports = {
    getCompanys,
    getCompanyInfo,
}