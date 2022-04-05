const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const {
    getCurrenciesList,
    currencyConversionPrice,
} = require('../controllers/currencyController')

router.route('/').get(authenticationMiddleware, getCurrenciesList)
router.route('/:currency').get(authenticationMiddleware, currencyConversionPrice)

module.exports = router