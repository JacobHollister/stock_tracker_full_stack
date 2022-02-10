const express = require('express')
const router = express.Router()

const authenticationMiddleware = require('../middleware/auth')

const {
    getWatchList,
    addTicker,
    updateTickerPositions,
    removeTicker
} = require('../controllers/watchlistController')

router.route('/').get(authenticationMiddleware ,getWatchList)
                .post(authenticationMiddleware ,addTicker)
                .patch(authenticationMiddleware ,updateTickerPositions)
                .delete(authenticationMiddleware ,removeTicker)


module.exports = router