import axios from 'axios'

const API_URL= '/api/v1/trades/stock'

const addTrade = async(tradeDetails, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.post(API_URL, {...tradeDetails} ,config)

    return response.data
}

const deleteTrade = async(trade_id, token) => {
    const config = {data: {trade_id}, headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.delete(API_URL, config)

    return response.data
}

const updateTrade = async(tradeDetails, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.patch(API_URL, {...tradeDetails}, config)

    return response.data
}

const tradeService = {
    addTrade,
    deleteTrade,
    updateTrade,
}

export default tradeService