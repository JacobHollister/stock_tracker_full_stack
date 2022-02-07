const express = require('express')
const router = express.Router()

const getLineData = require('../controllers/line')

router.route('/').get(getLineData)

module.exports = router