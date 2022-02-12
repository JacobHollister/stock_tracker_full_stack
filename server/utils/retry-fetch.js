const fetch = require('node-fetch')

const timeDelay = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
const retryFetch = (url, fetchOptions = {}, retries = 3, retryDelay = 1000) => {
    return new Promise((resolve, reject) => {
        //console.log(url)
        const fetchUrl = retryNum => {
            fetch(url, fetchOptions)
                .then(res => { 
                    if (res.status === 429){
                        throw new Error('API limit reached')
                    }
                    resolve(res) })
                .catch(async err => {
                    if(retryNum > 0) {
                        console.log('retrying')
                        await timeDelay(retryDelay)
                        fetchUrl(--retryNum)
                    } else {
                        reject(err)
                    }
                })
        }

        fetchUrl(retries)
    })
}

module.exports = retryFetch