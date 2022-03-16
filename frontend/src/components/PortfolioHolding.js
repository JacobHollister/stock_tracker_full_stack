import { useEffect, useState } from 'react'
import {PorfolioCompanyCard, PorfolioCompanyCardInfo} from './styles/PortfolioHolding.styled'

const PortfolioHolding = ({company, trades, companyData}) => {

    const [holdingData, setHoldingData ] = useState({
        gainAmount: 0,
        gainPercent: 0,
        averageCost: 0,
        shareAmount: 0,
        totalCost: 0
    })
    const [ color, setColor ] = useState(null)

    const shareAmountHandler = (trades) => {
        let quantity = 0
        trades.forEach(trade => {
            quantity += trade.quantity
        });
        return quantity
    }

    const totalCostHandler = (trades) => {
        let totalCost = 0
        trades.forEach((trade) => {
            totalCost += trade.purchase_price * trade.quantity
        })
        return totalCost
    }
    
    const averageCostHandler = (totalCost, shareAmount) => {
        return (totalCost / shareAmount).toFixed(2)
    }

    const gainAmountHandler = (companyData, totalCost, shareAmount) => {
        const currentPrice = companyData.data[companyData.data.length -1] 
        const currentInvestment = currentPrice * shareAmount
        return (currentInvestment - totalCost).toFixed(2)
    }
    
    const gainPercenttHandler = (gainAmount, totalCost, shareAmount) => {
        const currentPrice = companyData.data[companyData.data.length -1] 
        const currentInvestment = currentPrice * shareAmount
        const changeDirection = ( currentInvestment > totalCost ) ? '+' : "-"
        const changePercentage = Math.abs(((gainAmount / currentInvestment) * 100).toFixed(2))
        return `${changeDirection} ${changePercentage}%`
    }
    
    useEffect(()=> {
        if(!companyData || !trades.length) return
        const shareAmount = shareAmountHandler(trades)
        const totalCost = totalCostHandler(trades)
        const averageCost = averageCostHandler(totalCost, shareAmount)
        const gainAmount = gainAmountHandler(companyData, totalCost, shareAmount)
        const gainPercent = gainPercenttHandler(gainAmount, totalCost, shareAmount)

        setHoldingData({
            shareAmount, 
            averageCost,
            gainAmount,
            gainPercent
        })

        const dangerFill = '#d9534f';
        const successFill =  '#5cb85c'; 
        
        setColor((gainAmount > 0 ? successFill : dangerFill))

    }, [trades, companyData])
    
    
    

    return(
        <>
            <PorfolioCompanyCard>
                <h3>
                    <span>{company}</span>
                    <span> - </span>
                    <span>${companyData ? companyData.data[companyData.data.length -1] : '0.0'}</span>
                </h3>
                    <PorfolioCompanyCardInfo>
                        <div>
                            <span>Average cost : </span>
                            <span >{holdingData.averageCost}</span>
                        </div>
                        <div>
                            <span>Shares : </span>
                            <span >{holdingData.shareAmount}</span>
                        </div>
                    </PorfolioCompanyCardInfo>
                    <PorfolioCompanyCardInfo color={color}>
                        <div>
                            <span>Gain / Loss: </span>
                            <span >{holdingData.gainAmount}</span>
                        </div>
                        <div>
                            <span>Gain / Loss % : </span>
                            <span >{holdingData.gainPercent}</span>
                        </div>
                    </PorfolioCompanyCardInfo>
            </PorfolioCompanyCard>
        </>
    )

}

export default PortfolioHolding