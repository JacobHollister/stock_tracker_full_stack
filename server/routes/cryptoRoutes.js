const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const {
    getCryptoInfo,
} = require('../controllers/cryptoController')

router.route('/:symbol').get(getCryptoInfo)

module.exports = router