export const portfolioCloseHandler = (fetchedCompanyLineData, tradedCompanies) => {
    let total = 0

for (const company in tradedCompanies) {
    const amount = tradedCompanies[company]
    const closeData = fetchedCompanyLineData[company].data
    const closePrice = closeData[closeData.length - 1]
    const totalPoistion = closePrice * amount
    total += totalPoistion
    }
    return total.toFixed(2)
}

export const portfolioGraphDataHandler = (graphData) => {
    const fixedGraphData = {}
    
    // Find company with longest data set
    let LongestCompany = Object.keys(graphData).reduce((prev, curr) => {
        return (graphData[curr].data.length > graphData[prev].data.length) ? curr : prev
    }, Object.keys(graphData)[0])

    // Iterate over each companies data set and fill in missing data with closest availible data
    Object.keys(graphData).forEach((company) => {
        // if company has the longest data set or its dataset is equal to the longest use data and return
        if(company === LongestCompany || graphData[company].data.length === graphData[LongestCompany].data.length) {
        fixedGraphData[company] = graphData[company]
        return
        } 

        // Create new data set to push availible data and created data to
        const fixedData = { [company] : { data: [], date:[]}}

        // Iterate over date data of company with longest dataset and check
        // if companys dataset include data for each timeframe
        graphData[LongestCompany].date.forEach(( closeTime, ind ) => {

        // If companys dataset does not include time push time into array
        if(!graphData[company].date.includes(closeTime)){
            // Push time into fixedData array
            fixedData[company].date.push(closeTime)

            // <-- old api code -->
            //fixedData[company].date.push(graphData[LongestCompany].date[ind]) <-- old api code
            // <-- old api code -->

            // Push data from closest previous time or next time if availible
            if(fixedData[company].data.length === 0){
            fixedData[company].data.push(graphData[company].data[0])
            } else {
            fixedData[company].data.push(fixedData[company].data[ind - 1])
            }
        } else {
            // If time is included in companys dataSet put all data to fixed array
            const indexOfData = graphData[company].date.indexOf(closeTime)

            // <-- old api code -->
            //fixedData[company].labels.push(closeTime) 
            // <-- old api code -->
            
            fixedData[company].data.push(graphData[company].data[indexOfData])
            fixedData[company].date.push(graphData[company].date[indexOfData])
        }
        })
        // Add fixed company data to fixed graph data object
        fixedGraphData[company] = fixedData[company]
    })
    return fixedGraphData

}

export const portfolioOpenHandler = (fetchedCompanyLineData, tradedCompanies) => {
    let total = 0

    for (const company in tradedCompanies) {
    const amount = tradedCompanies[company]
    const closeData = fetchedCompanyLineData[company].data
    const closePrice = closeData[0]
    const totalPoistion = closePrice * amount
    total += totalPoistion
    }
    return total.toFixed(2)
}

export const portfolioChangeHandler = (portfolioData, chartResolution) => {
    const open = (parseFloat(portfolioData.openCrypto) + parseFloat(portfolioData.openStock)).toFixed(2)
    const close = (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeStock)).toFixed(2)
    const changeDirection = ( close > open ) ? '+' : "-"
    const change = close - open
    const changeAmount = Math.abs(change.toFixed(2))
    const changePercentage = Math.abs(((change / open) * 100).toFixed(2))
    return `${changeDirection}$${changeAmount} (${changeDirection}${changePercentage}%) ${chartResolution}` 
}

export const portfolionIvestmentGainHandler = (portfolioData) => {
    const close = (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeStock)).toFixed(2)
    const changeDirection = ( close > portfolioData.investmentCost ) ? '+' : "-"
    return `${changeDirection}$${(close - portfolioData.investmentCost).toFixed(2)}`
}

export const portfolfioInvestmentPercentHandler = (portfolioData) => {
    const close = (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeStock)).toFixed(2)
    const changeDirection = ( close > portfolioData.investmentCost ) ? '+' : "-"
    const change = close - portfolioData.investmentCost
    const changeAmount = Math.abs(change.toFixed(2))
    const changePercentage = Math.abs(((changeAmount / portfolioData.investmentCost) * 100).toFixed(2))
    console.log(portfolioData.investmentCost)
    return `${changeDirection}${changePercentage}%`
}

export   const portfolfioInvestmentColorHandler = (portfolioData) => {
    const dangerFill = '#d9534f';
    const successFill =  '#5cb85c'; 
    const close = (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeStock)).toFixed(2)
    return (close > portfolioData.investmentCost ) ? successFill : dangerFill
}