const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    getQuote
} = require('../controllers/quote')

router.route('/:ticker').get(authenticationMiddleware, getQuote)

module.exports = router