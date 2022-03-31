import axios from 'axios'

const API_STOCK_URL= '/api/v1/trades/stock'
const API_CRYPTO_URL= '/api/v1/trades/crypto'

const addTrade = async(tradeDetails, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    if(tradeDetails.ticker){
        const response = await axios.post(API_STOCK_URL, {...tradeDetails} ,config)
        return response.data
    } else if (tradeDetails.symbol){
        const response = await axios.post(API_CRYPTO_URL, {...tradeDetails} ,config)
        return response.data
    }
}

const deleteTrade = async(trade_id, trades, token) => {
    const combinedTrades = [...trades.stocks, ...trades.crypto]
    const editingTrade = combinedTrades.filter((trade) => {
        return trade._id === trade_id
    })[0]
    const { ticker, symbol} = editingTrade

    const config = {data: {trade_id}, headers: {'Authorization': `Bearer ${token}`}}

    if(ticker){
        const response = await axios.delete(API_STOCK_URL ,config)
        return response.data
    } else if (symbol){
        const response = await axios.delete(API_CRYPTO_URL ,config)
        return response.data
    }
}

const updateTrade = async(tradeDetails, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    if(tradeDetails.ticker){
        const response = await axios.patch(API_STOCK_URL, {...tradeDetails} ,config)
        return response.data
    } else if (tradeDetails.symbol){
        const response = await axios.patch(API_CRYPTO_URL, {...tradeDetails} ,config)
        return response.data
    }
}

const tradeService = {
    addTrade,
    deleteTrade,
    updateTrade,
}

export default tradeService