const getWatchList = (req, res) => {
    res.send('watchlist')
}

const addTicker = (req, res) => {
    res.send(`Add ${req.body.ticker} to watchlist`)
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