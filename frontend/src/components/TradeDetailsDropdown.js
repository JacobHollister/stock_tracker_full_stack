import { useEffect, useState } from "react"
import { TradeDetailsInfo , TradeDetailsHeader, TradeDetailsContainer, ButtonSmall } from './styles/Portfolio.styled'
import {format} from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTrade, reset } from '../features/trades/tradesSlice'
import { getPortfolio } from '../features/portfolio/portfolioSlice'
import { useNavigate } from 'react-router-dom'

const TradeDetailsDropdown = ({trades}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message  } = useSelector((state) => state.trades)

    useEffect(() => {
    if(isError) {
        console.log(message)
    }
    if (isSuccess) {
        dispatch(getPortfolio())
    }

    dispatch(reset())

    }, [isError, isSuccess, message, dispatch])

    const deleteTradeHandler = (purchase_id) => {
        dispatch(deleteTrade(purchase_id))
    }
    
    let tradesDetails = trades.map((trade, ind) => {
        const editPath = `/edittrade/${trade._id}`
        return (
            <TradeDetailsInfo key={ind}>
                <span>{trade.quantity}</span>
                <span>${trade.purchase_price}</span>
                <span>{format(new Date(trade.purchase_date), 'do MMM yyyy')}</span>
                <span>       
                    <ButtonSmall 
                        color={'grey'}
                        onClick={() => navigate(editPath)}>Edit</ButtonSmall>
                    <ButtonSmall 
                        color={'#d9534f'} 
                        onClick={() => deleteTradeHandler(trade._id)}
                        >Delete</ButtonSmall>
                </span>

            </TradeDetailsInfo>
        )
    })

    return (
        <TradeDetailsContainer>
            <TradeDetailsHeader>
            <span>Total Shares</span>    
            <span>Purchase Price</span>    
            <span>Purchase Date</span>    
            <span></span>    
            </TradeDetailsHeader> 
            {tradesDetails}
        </TradeDetailsContainer>
    )
}

export default TradeDetailsDropdown

