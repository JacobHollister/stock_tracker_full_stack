const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const getCandles = require('../controllers/candlesController')

router.route('/').get(authenticationMiddleware, cache('10 minutes'), getCandles)

module.exports = router