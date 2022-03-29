const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const getCryptoLine = require('../controllers/cryptoLineController')

router.route('/').get(cache('30 seconds'), getCryptoLine)

module.exports = router