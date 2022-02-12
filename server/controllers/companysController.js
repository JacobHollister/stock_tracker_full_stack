
const Company = require('../models/companys')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {getFinhubCompanyInfo} = require('../finhub_api/finhub_api')

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

    const companyInfo = await Company.findOne({ticker: companyTicker})

    if (!companyInfo){
        const newCompanyInfo = await getFinhubCompanyInfo(companyTicker)

        if(!newCompanyInfo) {
            return next(createCustomError(`No company with id : ${companyTicker}`, 404))
        } else {
            const createCompanyInfo = await Company.create(newCompanyInfo)
            return res.status(200).json(createCompanyInfo)
        }
    }
    return res.status(200).json(companyInfo)
})

module.exports = {
    getCompanys,
    getCompanyInfo,
}