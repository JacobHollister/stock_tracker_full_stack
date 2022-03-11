import axios from 'axios'

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