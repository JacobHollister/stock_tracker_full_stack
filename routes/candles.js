const express = require('express')
const router = express.Router()

const getCandles = require('../controllers/candles')

router.route('/').get(getCandles)

module.exports = router