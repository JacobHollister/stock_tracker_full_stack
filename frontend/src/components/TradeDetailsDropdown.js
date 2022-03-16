//import { useEffect, useState } from "react"
import { TradeDetailsInfo , TradeDetailsHeader } from './styles/Portfolio.styled'

const TradeDetailsDropdown = ({trades}) => {

    let tradesDetails = trades.map((trade, ind) => {
        return (
            <TradeDetailsInfo key={ind}>
                <span>{trade.quantity}</span>
                <span>{trade.purchase_price}</span>
                <span>{trade.purchase_date}</span>
                <span>       
                    <button>edit</button>
                    <button>remove</button>
                </span>

            </TradeDetailsInfo>
        )
    })

    return (
        <>
            <TradeDetailsHeader>
            <span>Total Shares</span>    
            <span>Purchase Price</span>    
            <span>Purchase Date</span>    
            <span></span>    
            </TradeDetailsHeader> 
            {tradesDetails}
        </>
    )
}

export default TradeDetailsDropdown