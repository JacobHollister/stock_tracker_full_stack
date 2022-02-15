const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const {
    getCompanys,
    getCompanyInfo,
    updateCompanyInfo,
    removeCompanyinfo
} = require('../controllers/companysController')

router.route('/').get(authenticationMiddleware, cache('10 minutes'), getCompanys)
router.route('/:ticker').get(authenticationMiddleware, cache('10 minutes'), getCompanyInfo)

module.exports = router