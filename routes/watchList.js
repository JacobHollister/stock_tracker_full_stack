const express = require('express')
const router = express.Router()

const {
    getWatchList,
    addTicker,
    updateTickerPositions,
    removeTicker
} = require('../controllers/watchlist')

router.route('/').get(getWatchList)
                .post(addTicker)
                .patch(updateTickerPositions)
                .delete(removeTicker)


module.exports = router