const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const getLineData = require('../controllers/lineController')

router.route('/').get(cache('2 minutes'), getLineData)

module.exports = router