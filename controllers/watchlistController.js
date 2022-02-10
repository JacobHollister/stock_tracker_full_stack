const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const Watchlist = require('../models/watchlist')

const getWatchList = asyncWrapper(async (req, res) => {
    const userWatchlist = await Watchlist.findOne({user_email: req.user.email})
    if(!userWatchlist){
        const newWatchlist = await Watchlist.create({user_email: req.user.email, watchlist: [] })
        res.status(200).json(newWatchlist)
    }
    res.status(200).json(userWatchlist)
})

const addTicker = asyncWrapper(async (req, res, next) => {
    const newTicker = req.body.ticker
    const userWatchlist = await Watchlist.findOne({user_email: req.user.email})
    if(userWatchlist.watchlist.includes(newTicker)){
        return next(createCustomError(`Watchlist already contains ticker: ${newTicker}`, 400))
    }
    const newWatchlist = [...userWatchlist.watchlist, newTicker]
    const updatedWatchlist = await Watchlist.findOneAndUpdate({user_email: req.user.email}, {watchlist: newWatchlist}, {new: true})
    
    res.status(201).json({updatedWatchlist})
})

const removeTicker = asyncWrapper( async (req, res) => {
    const ticker = req.body.ticker
    const userWatchlist = await Watchlist.findOne({user_email: req.user.email})
    if(!userWatchlist.watchlist.includes(ticker)){
        return next(createCustomError(`Watchlist does not contain ticker: ${ticker}`, 400))
    }
    const newWatchlist = [...userWatchlist.watchlist].filter((tick) => { return tick !== ticker} )
    const updatedWatchlist = await Watchlist.findOneAndUpdate({user_email: req.user.email}, {watchlist: newWatchlist}, {new: true})
    
    res.status(201).json({updatedWatchlist})
})

const updateTickerPositions = asyncWrapper( async(req, res) => {
    const newWatchlist = req.body.watchlist
    const updatedWatchlist = await Watchlist.findOneAndUpdate({user_email: req.user.email}, {watchlist: newWatchlist}, {new: true})
    
    res.status(201).json({updatedWatchlist})
})

module.exports = {
    getWatchList,
    addTicker,
    updateTickerPositions,
    removeTicker
}