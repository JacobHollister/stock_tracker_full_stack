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