const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    watchlist: [{
        type: String
    }]
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);