const mongoose = require('mongoose');

const StockTradeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    ticker: {
        type: String,
        required: [true, 'Please provide ticker'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide quantity'],
    },
    purchase_date: {
        type: Date,
        required: [true, 'Please provide purchase date'],
    },
    purchase_price: {
        type: Number,
        required: [true, 'Please provide purchase price'],
    }
});

module.exports = mongoose.model('StockTrade', StockTradeSchema);