const mongoose = require('mongoose')

const WatchListSchema = new mongoose.Schema({
    user_id:String,
    completed:Boolean
})

module.exports = mongoose.model('WatchList', WatchListSchema)