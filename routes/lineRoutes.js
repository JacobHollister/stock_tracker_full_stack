const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const getLineData = require('../controllers/lineController')

router.route('/').get(authenticationMiddleware, getLineData)

module.exports = router