import axios from 'axios'

export const fetchNewsContent = async (page, ticker) => {
    const tickerUrl = ticker ? '/' + ticker : "" 

    return await new Promise((resolve, reject)=>{
        axios.get(`http://localhost:5000/api/v1/news${tickerUrl}?page=${page}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}

export const fetchCompanyInfo = async (ticker) => {
    return await new Promise((resolve, reject)=>{
        axios.get(`http://localhost:5000/api/v1/companys/${ticker}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}

export const fetchQuote = async (ticker) => {
    return await new Promise((resolve, reject)=>{
        axios.get(`http://localhost:5000/api/v1/stock/quote/${ticker}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}

export const fetchLineData = async (ticker, resolution) => {
    return await new Promise((resolve, reject)=>{
        axios.get(`http://localhost:5000/api/v1/stock/line?ticker=${ticker}&resolution=${resolution}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}
