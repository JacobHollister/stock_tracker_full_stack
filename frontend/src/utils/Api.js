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
