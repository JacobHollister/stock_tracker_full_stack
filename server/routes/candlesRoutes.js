const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const getCandles = require('../controllers/candlesController')

router.route('/').get(authenticationMiddleware, getCandles)

module.exports = router