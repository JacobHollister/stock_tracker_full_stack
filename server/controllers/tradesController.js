const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const Trade = require('../models/trade')

// @desc    Get users trades
// @route   GET /api/v1/trades
// @access  Private
const gettrades = asyncWrapper(async (req, res, next) => {
    const userTrades = await Trade.find({user: req.user._id})

    if(userTrades.length === 0) return next(createCustomError('No trades by user found', 404))

    res.status(200).json(userTrades)
})

// @desc    Add user trade
// @route   POST /api/v1/trades
// @access  Private
const addTrade = asyncWrapper(async (req, res, next) => {
    const {ticker, quantity, purchase_date, purchase_price} = req.body

    const newTrade = await Trade.create({user: req.user._id, ticker, quantity, purchase_date, purchase_price})

    res.status(201).json(newTrade)
})

// @desc    Delete trade
// @route   Delete /api/v1/trades
// @access  Private
const removeTrade = asyncWrapper( async (req, res, next) => {
    const trade = await Trade.findOne({user: req.user._id, _id: req.body.trade_id})

    if(trade) {
        trade.remove()
        res.status(201).json({"msg": "Trade deleted"})
    } else {
        return next(createCustomError(`No trade with ID: ${req.body.trade_id} found`, 404))
    }
})

// @desc    Update user trade
// @route   Patch /api/v1/trades
// @access  Private
const updateTrade = asyncWrapper( async(req, res, next) => {

    const trade = await Trade.findOne({user: req.user._id, _id: req.body.trade_id})

    if(trade) {
        const updatedTrade = await Trade.findOneAndUpdate({user: req.user._id, _id: req.body.trade_id}, req.body, {new: true})
        res.status(201).json({updatedTrade})
    } else {
        return next(createCustomError(`No trade with ID: ${req.body.trade_id} found`, 404))
    }
})

module.exports = {
    gettrades,
    addTrade,
    updateTrade,
    removeTrade
}