const WatchList = require('../models/watchlist')

const getWatchList = (req, res) => {
    res.send('watchlist')
}

const addTicker = async (req, res) => {
    const watchList = await WatchList.create(req.body)
    res.status(201).json({watchList})
}

const removeTicker = (req, res) => {
    res.send(`remove ${req.body.ticker} from watchlist`)
}

const updateTickerPositions = (req, res) => {
    res.send(`update positions of tickers on watchlist`)
}

module.exports = {
    getWatchList,
    addTicker,
    updateTickerPositions,
    removeTicker
}