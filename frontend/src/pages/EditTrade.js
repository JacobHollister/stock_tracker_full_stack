// Package imports
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {format} from 'date-fns'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { confirm_update } from '../features/trades/tradesSlice'
import { getPortfolio } from '../features/portfolio/portfolioSlice'

// Styled Components
import { ButtonLarge } from '../components/styles/UI.styled'
import { StyledHeading } from "../components/styles/Heading.styled"
import { 
    Form, 
    FormContainer, 
    FormButtonContainer, 
    QueryButton 
} from '../components/styles/Form.styled'


export default function EditTrade() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { trades  } = useSelector((state) => state.portfolio)

    useEffect(() => {
        if(!user){
            navigate('/login')
        } else {
            dispatch(getPortfolio())
        }
    }, [user, navigate, dispatch])

    const {trade_id} = useParams()

    const [formData, setFormData] = useState({
        ticker: '',
        purchase_price: '',
        purchase_date: '',
        quantity: '',
        symbol: '',
        pairingSymbol: ''
    })

    const {purchase_price, symbol, pairingSymbol, purchase_date, quantity, ticker } = formData

    useEffect(() => {
        if(Object.keys(trades).length > 0){
            const combinedTrades = [...trades.stocks, ...trades.crypto]
            const editingTrade = combinedTrades.filter((trade) => {
                return trade._id === trade_id
            })[0]
            const { ticker, symbol, pairingSymbol, purchase_price, quantity } = editingTrade
            const purchase_date = format(new Date(editingTrade.purchase_date), 'yyyy-MM-dd')
            setFormData({ ticker, symbol, pairingSymbol, purchase_price, purchase_date, quantity, trade_id })
        }
    }, [trades, trade_id])

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if((formData.ticker || (formData.symbol && formData.pairingSymbol)) && purchase_price && quantity && purchase_date) {
            if(symbol){
                const cryptoFormData = {
                    trade_id,
                    symbol: formData.symbol,
                    pairingSymbol: formData.pairingSymbol,
                    purchase_price,
                    purchase_date,
                    quantity
                }
                dispatch(confirm_update(cryptoFormData))
            } else if(formData.ticker) {
                const stockFormData = {
                    trade_id,
                    ticker: formData.ticker,
                    purchase_price,
                    purchase_date,
                    quantity
                }
                dispatch(confirm_update(stockFormData))
            }
        } else {
            console.log('not all fields filled out')
        }
    }


    return (
        <>
        <FormContainer>
            <StyledHeading>
                <h1>
                    EDIT TRADE
                </h1>
            </StyledHeading>
            <Form>
                <form onSubmit={onSubmit}>
                    { ticker ? (
                        <>
                            <label >Company</label>
                            <input
                                type='text'
                                id='ticker'
                                name='ticker'
                                placeholder={ticker}
                                disabled
                            />
                        </>
                        ) : (
                        null
                        )}
                        { symbol ? (
                            <>
                                <label >Currency</label>
                                <input
                                type='text'
                                id='symbol'
                                name='symbol'
                                placeholder={symbol}
                                disabled
                                />
                                <label >Currency Pairing</label>
                                <input
                                type='text'
                                id='pairingSymbol'
                                name='pairingSymbol'
                                placeholder={pairingSymbol}
                                disabled
                                />
                            </>
                        ) : (
                            null
                        )}
                    <label htmlFor='purchase_price'>Purchase price</label>
                    <input
                        type='number'
                        id='purchase_price'
                        name='purchase_price'
                        value={purchase_price}
                        placeholder='Enter purchase price'
                        onChange={onChange}
                    />
                    {symbol ? (
                        <>
                            <label htmlFor='quantity'>Amount of Currency</label>
                            <input
                                type='number'
                                id='quantity'
                                name='quantity'
                                value={quantity}
                                placeholder='Amount of Currency'
                                onChange={onChange}
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor='quantity'>Amount of shares</label>
                            <input
                                type='number'
                                id='quantity'
                                name='quantity'
                                value={quantity}
                                placeholder='Enter amount of shares'
                                onChange={onChange}
                            />
                        </>
                    )}
                    <label htmlFor='purchase_date'>Purchased date</label>
                    <input
                        type='date'
                        id='purchase_date'
                        name='purchase_date'
                        value={purchase_date}
                        placeholder='Enter purchase date'
                        onChange={onChange}
                    />
                <FormButtonContainer>
                    <ButtonLarge color={'success'} type='submit'>
                    Edit Trade
                    </ButtonLarge>
                    <QueryButton onClick={() => navigate('/portfolio')}>
                        Back to portfolio
                    </QueryButton>
                </FormButtonContainer>
                </form>
            </Form>
        </FormContainer>
        </>
    )
}