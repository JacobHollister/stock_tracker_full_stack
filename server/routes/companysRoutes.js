const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const {
    getCompanys,
    getCompanyInfo,
    companySearch,
    updateCompanyInfo,
    removeCompanyinfo
} = require('../controllers/companysController')

router.route('/').get(authenticationMiddleware, cache('10 minutes'), getCompanys)
router.route('/search').get(cache('10 minutes'), companySearch)
router.route('/:ticker').get(cache('10 minutes'), getCompanyInfo)

module.exports = router