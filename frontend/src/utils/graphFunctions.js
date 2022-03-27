import { fromUnixTime, format } from "date-fns";

export const graphColourHandler = (change) => {
    const dangerFill = '#d9534f';
    const successFill =  '#5cb85c'; 
    if (change < 0){
        return dangerFill
    } else if (change > 0) {
        return successFill
    } else {
        return 'grey'
    }
}

export const quoteChangeHandler = (quote) => {
    const changeDirection = ( quote.dp > 0 ) ? '+' : "-"
    const changeAmount = Math.abs(quote.d.toFixed(2))
    const changePercentage = Math.abs(quote.dp.toFixed(2))
    return `${changeDirection}$${changeAmount} (${changeDirection}${changePercentage}%) Day` 
}

export const graphLabelDataHandler = (dateData, resolution) => {
    const timeFormatString = formatTimeString(resolution)


    const labelData = dateData.map( (time) => {
        return format(fromUnixTime(time), timeFormatString)
    })

    return labelData
}

function formatTimeString(resolution) { 
    switch (resolution) {
        case "day":
            return 'ccc p'
        case 'week':
            return 'ccc eo h aaaa'
        // default: Month or Year
        default:
            return 'LLLL eo'
    }
}