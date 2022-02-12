const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    getNews,
    getCompanyNews
} = require('../controllers/newsController')

router.route('/').get(authenticationMiddleware, getNews)
router.route('/:ticker').get(authenticationMiddleware, getCompanyNews)

module.exports = router