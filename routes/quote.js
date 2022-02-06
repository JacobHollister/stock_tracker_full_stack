const express = require('express')
const router = express.Router()

const {
    getQuote
} = require('../controllers/quote')

router.route('/:ticker').get(getQuote)

module.exports = router