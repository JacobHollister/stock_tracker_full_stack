const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const {
    getQuote
} = require('../controllers/quoteController')

router.route('/:ticker').get(cache('10 minutes'), getQuote)

module.exports = router