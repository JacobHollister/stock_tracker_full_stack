const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({

    user_email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
    },

    watchlist: [{
        type: String
    }]
});

module.exports = mongoose.model('Watchlist', WatchlistSchema);