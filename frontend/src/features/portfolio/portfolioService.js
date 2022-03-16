import axios from 'axios'

const API_URL= '/api/v1/trades/'

const getPortfolio = async(token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const response = await axios.get(API_URL, config)

    return response.data
}

const tradeService = {
    getPortfolio,
}

export default tradeService