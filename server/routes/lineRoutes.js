const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const getLineData = require('../controllers/lineController')

router.route('/').get(getLineData)

module.exports = router