const express = require('express')
const router = express.Router()

const {
    getNews,
    getCompanyNews
} = require('../controllers/news')

router.route('/').get(getNews)
router.route('/:ticker').get(getCompanyNews)

module.exports = router