const mongoose = require('mongoose');

const CryptoTradeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    symbol: {
        type: String,
        required: [true, 'Please provide symbol'],
    },
    pairingSymbol: {
        type: String,
        required: [true, 'Please provide paring symbol'],
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

module.exports = mongoose.model('CryptoTrade', CryptoTradeSchema);