const express = require('express')
const router = express.Router()
const cache = require('apicache').middleware

const authenticationMiddleware = require('../middleware/auth')

const {
    getNews,
    getCompanyNews
} = require('../controllers/newsController')

router.route('/').get(authenticationMiddleware, cache('10 minutes'), getNews)
router.route('/:ticker').get(authenticationMiddleware, cache('10 minutes'), getCompanyNews)

module.exports = router