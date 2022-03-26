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