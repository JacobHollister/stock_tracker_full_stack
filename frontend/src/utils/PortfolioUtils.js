export const portfolioCloseHandler = (fetchedCompanyLineData, tradedCompanies) => {
    let total = 0
    console.log(fetchedCompanyLineData)

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

let LongestCompany = Object.keys(graphData).reduce((prev, curr) => {
    return (graphData[curr].data.length > graphData[prev].data.length) ? curr : prev
}, Object.keys(graphData)[0])

Object.keys(graphData).forEach((company) => {
    if(company === LongestCompany || graphData[company].data.length === graphData[LongestCompany].data.length) {
    fixedGraphData[company] = graphData[company]
    return
    } 
    const fixedData = { [company] : { data: [], labels: []}}
    graphData[LongestCompany].labels.forEach(( closeTime, ind ) => {
    if(!graphData[company].labels.includes(closeTime)){
        fixedData[company].labels.push(closeTime)
        if(fixedData[company].data.length === 0){
        fixedData[company].data.push(graphData[company].data[0])
        } else {
        fixedData[company].data.push(fixedData[company].data[ind - 1])
        }
    } else {
        fixedData[company].labels.push(closeTime)
        fixedData[company].data.push(graphData[company].data[ind])
    }
    })
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