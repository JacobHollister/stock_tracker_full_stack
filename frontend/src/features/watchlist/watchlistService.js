import axios from 'axios'

const API_URL= '/api/v1/watchlist/'

const addToWatchlist = async(ticker, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.post(API_URL, {ticker} ,config)

    return response.data
}

const getWatchlist = async(token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.get(API_URL, config)

    return response.data
}

const removeFromWatchlist = async(ticker, token) => {
    const config = {data: {ticker}, headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.delete(API_URL, config)

    return response.data
}

const updateWatchlist = async() => {

}

const watchlistService = {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
    updateWatchlist
}

export default watchlistService