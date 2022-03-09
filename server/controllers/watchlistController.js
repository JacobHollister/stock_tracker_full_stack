const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const Watchlist = require('../models/watchlist')

// @desc    Get users watchlist
// @route   GET /api/v1/watchlist
// @access  Private
const getWatchList = asyncWrapper(async (req, res) => {
    const userWatchlist = await Watchlist.findOne({user: req.user._id}).select()

    if(!userWatchlist) return next(createCustomError('No watchlist for this user found', 404))

    res.status(200).json(userWatchlist.watchlist)
})

// @desc    Add ticker to users watchlist
// @route   POST /api/v1/watchlist
// @access  Private
const addTicker = asyncWrapper(async (req, res, next) => {
    const userWatchlist = await Watchlist.findOne({user: req.user._id})

    const newTicker = req.body.ticker

    if(userWatchlist.watchlist.includes(newTicker)) return next(createCustomError(`Watchlist already contains ticker: ${newTicker}`, 400))

    const newWatchlist = [...userWatchlist.watchlist, newTicker]

    const updatedWatchlist = await Watchlist.findOneAndUpdate({user: userWatchlist.user}, {watchlist: newWatchlist}, {new: true})

    res.status(201).json(updatedWatchlist.watchlist)
})

// @desc    Delete ticker to users watchlist
// @route   Delete /api/v1/watchlist
// @access  Private
const removeTicker = asyncWrapper( async (req, res, next) => {
    const userWatchlist = await Watchlist.findOne({user: req.user._id})
    const ticker = req.body.ticker

    if(!userWatchlist.watchlist.includes(ticker)) return next(createCustomError(`Watchlist does not contain ticker: ${ticker}`, 400))

    const newWatchlist = [...userWatchlist.watchlist].filter((tick) => { return tick !== ticker} )

    const updatedWatchlist = await Watchlist.findOneAndUpdate({user: userWatchlist.user}, {watchlist: newWatchlist}, {new: true})

    res.status(201).json(updatedWatchlist.watchlist)
})

// @desc    Update ticker positions in users watchlist
// @route   Patch /api/v1/watchlist
// @access  Private
const updateTickerPositions = asyncWrapper( async(req, res, next) => {
    const userWatchlist = await Watchlist.findOne({user: req.user._id})

    const newWatchlist = req.body.watchlist
    
    // Check if both new watchlist and exist watchlist contain the same tickers
    if (userWatchlist.watchlist.length === newWatchlist.length && newWatchlist.every(ticker => userWatchlist.watchlist.includes(ticker))) {
        const updatedWatchlist = await Watchlist.findOneAndUpdate({user: userWatchlist.user}, {watchlist: newWatchlist}, {new: true})
        return res.status(201).json(updatedWatchlist.watchlist)
    } else {
        return next(createCustomError(`Error updating watchlist`, 400))
    }
})

module.exports = {
    getWatchList,
    addTicker,
    updateTickerPositions,
    removeTicker
}