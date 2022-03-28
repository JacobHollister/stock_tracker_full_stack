import axios from 'axios'

// Get user from local storage
// const userToken = JSON.parse(localStorage.getItem('user')).token

export const fetchNewsContent = async (page, ticker) => {
    const tickerUrl = ticker ? '/' + ticker : "" 

    return await new Promise((resolve, reject)=>{
        axios.get(`/api/v1/news${tickerUrl}?page=${page}`)
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
        axios.get(`/api/v1/companys/${ticker}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}

export const fetchCryptoInfo = async (symbol, token) => {
    const config = {headers: {'Authorization': `Bearer ${token}`}}

    return await new Promise((resolve, reject)=>{
        axios.get(`/api/v1/crypto/${symbol}`, config)
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
        axios.get(`/api/v1/stock/quote/${ticker}`)
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
        axios.get(`/api/v1/stock/line?ticker=${ticker}&resolution=${resolution}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}

export const fetchCryptoLineData = async (symbol, resolution) => {
    return await new Promise((resolve, reject)=>{
        axios.get(`/api/v1/crypto/line?cryptoSymbol=${symbol}&resolution=${resolution}`)
        .then(result => {
            resolve(result.data) 
        })
        .catch (
            err => reject(err)
        )
    })
}

export const searchCompanies = async (query) => {
    if (query === "") return
    return await new Promise((resolve, reject)=>{
        axios.get(`/api/v1/companys/search?q=${query}`)
        .then(result => {
            resolve(result) 
        })
        .catch (
            err => reject(err)
        )
    })
}