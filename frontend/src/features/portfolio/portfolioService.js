import axios from 'axios'

const STOCK_API_URL= '/api/v1/trades/stock'
const CRYPTO_API_URL= '/api/v1/trades/crypto'

const getPortfolio = async(token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    const stockResponse = await axios.get(STOCK_API_URL, config)
    const cryptoResponse = await axios.get(CRYPTO_API_URL, config)

    return {stocks: stockResponse.data, crypto: cryptoResponse.data}
}

const tradeService = {
    getPortfolio,
}

export default tradeService