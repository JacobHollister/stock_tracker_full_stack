import axios from 'axios'

const API_URL= '/api/v1/trades/'

const addTrade = async(tradeDetails, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.post(API_URL, {...tradeDetails} ,config)

    return response.data
}

// {
//     "ticker":"NKLA",
//     "quantity":5,
//     "purchase_date":"1508330494000",
//     "purchase_price":500  
// }

// const removeTrade = async(ticker, token) => {
//     const config = {data: {ticker}, headers: {'Authorization': `Bearer ${token}`}}

//     const response = await axios.delete(API_URL, config)

//     return response.data
// }

// const updateTrade = async() => {

// }

const tradeService = {
    addTrade,
    // removeTrade,
    // updateTrade,
}

export default tradeService