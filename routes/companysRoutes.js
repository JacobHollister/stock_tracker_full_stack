const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    getCompanys,
    getCompanyInfo,
    updateCompanyInfo,
    removeCompanyinfo
} = require('../controllers/companysController')

router.route('/').get(authenticationMiddleware, getCompanys)
router.route('/:ticker').get(authenticationMiddleware, getCompanyInfo)

module.exports = router