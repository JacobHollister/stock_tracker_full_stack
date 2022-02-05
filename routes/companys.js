const express = require('express')
const router = express.Router()

const {
    getCompanys,
    getCompanyInfo,
    updateCompanyInfo,
    removeCompanyinfo
} = require('../controllers/companys')

router.route('/').get(getCompanys)
router.route('/:ticker').get(getCompanyInfo)

module.exports = router