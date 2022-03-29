const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const CryptoTrade = require('../models/cryptoTrade')

// @desc    Get users crypto trades
// @route   GET /api/v1/trades/crypto
// @access  Private
const gettrades = asyncWrapper(async (req, res, next) => {
    const userTrades = await CryptoTrade.find({user: req.user._id})
    
    res.status(200).json(userTrades)
})

// @desc    Add user cyrpto trade
// @route   POST /api/v1/trades/crypto
// @access  Private
const addTrade = asyncWrapper(async (req, res) => {
    const {symbol, pairingSymbol, quantity, purchase_date, purchase_price} = req.body
    const newTrade = await CryptoTrade.create({user: req.user._id, symbol, pairingSymbol, quantity, purchase_date, purchase_price})
    
    res.status(201).json(newTrade)
})

// @desc    Delete crypto trade
// @route   Delete /api/v1/trades/crypto
// @access  Private
const removeTrade = asyncWrapper( async (req, res, next) => {
    const trade = await CryptoTrade.findOne({user: req.user._id, _id: req.body.trade_id})
    
    if(trade) {
        trade.remove()
        res.status(201).json({"msg": "Trade deleted"})
    } else {
        return next(createCustomError(`No trade with ID: ${req.body.trade_id} found`, 404))
    }
})

// @desc    Update user crypto trade
// @route   Patch /api/v1/trades/crypto
// @access  Private
const updateTrade = asyncWrapper( async(req, res, next) => {
    const trade = await CryptoTrade.findOne({user: req.user._id, _id: req.body.trade_id})

    if(trade) {
        const updatedTrade = await CryptoTrade.findOneAndUpdate({user: req.user._id, _id: req.body.trade_id}, req.body, {new: true})
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