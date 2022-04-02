// Package imports
import { useEffect, useState } from 'react'

// Components
import TradeDetailsDropdown from './TradeDetailsDropdown'

// Styled Components
import {PorfolioCompanyCard, PorfolioCompanyCardInfo} from '../styles/PortfolioHolding.styled'


export default function PortfolioHolding({company, trades, companyData}) {

    const [holdingData, setHoldingData ] = useState({
        gainAmount: 0,
        gainPercent: 0,
        averageCost: 0,
        shareAmount: 0,
        totalCost: 0,
        investmentTotal: 0
    })
    const [ color, setColor ] = useState(null)
    const [ tradesOpen, setTradesOpen ] = useState(false)

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

    const investmentTotalHandler = (companyData, shareAmount) => {
        const currentPrice = companyData.data[companyData.data.length -1] 
        const currentInvestment = currentPrice * shareAmount
        return currentInvestment.toFixed(2)
    }
    
    const gainPercenttHandler = (gainAmount, totalCost, shareAmount, companyData) => {
        const currentPrice = companyData.data[companyData.data.length -1] 
        const currentInvestment = currentPrice * shareAmount
        const changeDirection = ( currentInvestment > totalCost ) ? '+' : "-"
        const changePercentage = Math.abs(((gainAmount / totalCost) * 100).toFixed(2))
        return `${changeDirection} ${changePercentage}%`
    }
    
    useEffect(()=> {
        if(!companyData || !trades.length) return
        const shareAmount = shareAmountHandler(trades)
        const totalCost = totalCostHandler(trades)
        const averageCost = averageCostHandler(totalCost, shareAmount)
        const investmentTotal = investmentTotalHandler(companyData, shareAmount)
        const gainAmount = gainAmountHandler(companyData, totalCost, shareAmount)
        const gainPercent = gainPercenttHandler(gainAmount, totalCost, shareAmount, companyData)

        setHoldingData({
            shareAmount, 
            averageCost,
            gainAmount,
            gainPercent,
            investmentTotal
        })

        const dangerFill = '#d9534f';
        const successFill =  '#5cb85c'; 
        
        setColor((gainAmount > 0 ? successFill : dangerFill))

    }, [trades, companyData])

    return(
        <>
            <PorfolioCompanyCard onClick={() => setTradesOpen((prev) => !prev)}>
                <h3>
                    <span>{company.toUpperCase()}</span>
                    <span> - </span>
                    <span>${holdingData.investmentTotal}</span>
                </h3>
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
            </PorfolioCompanyCard>
            {tradesOpen ? <TradeDetailsDropdown trades={trades}/> : null}
        </>
    )

}