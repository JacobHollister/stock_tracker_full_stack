const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    gettrades,
    addTrade,
    updateTrade,
    removeTrade
} = require('../controllers/tradesController')

router.route('/').get(authenticationMiddleware ,gettrades)
                .post(authenticationMiddleware ,addTrade)
                .patch(authenticationMiddleware ,updateTrade)
                .delete(authenticationMiddleware ,removeTrade)


module.exports = router