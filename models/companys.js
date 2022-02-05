const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exchange:{
        type: String,
        required: true
    },
    ticker:{
        type: String,
        required: true
    },
    weburl:String,
    logo:String,
    finnhubIndustry:String,
    currency:String
})

module.exports = mongoose.model('Company', CompanySchema)