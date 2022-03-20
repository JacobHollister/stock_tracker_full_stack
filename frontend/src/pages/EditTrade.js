import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { confirm_update } from '../features/trades/tradesSlice'
import { Form, FormContainer, FormButtonContainer, QueryButton } from '../components/styles/Form.styled'
import { ButtonLarge } from '../components/styles/UI.styled'
import { StyledHeading } from "../components/styles/Heading.styled"
import { getPortfolio } from '../features/portfolio/portfolioSlice'
import {format} from 'date-fns'

const EditTrade = () => {
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
    })

    const {purchase_price, purchase_date, quantity, ticker } = formData

    useEffect(() => {
        if(trades.length > 0){
            const editingTrade = trades.filter((trade) => {
                return trade._id === trade_id
            })[0]
            const { ticker, purchase_price, quantity } = editingTrade
            const purchase_date = format(new Date(editingTrade.purchase_date), 'yyyy-MM-dd')
            setFormData({ ticker, purchase_price, purchase_date, quantity, trade_id })
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

        // check values
        if(formData.ticker && formData.purchase_price && formData.quantity && formData.purchase_date) {
            dispatch(confirm_update(formData))
        } else {
            console.log('not all fields filled out')
        }
    }


    return (
        <>
        <FormContainer>
            <StyledHeading>
                <h1>
                    ADD A TRADE
                </h1>
            </StyledHeading>
            <Form>
                <form onSubmit={onSubmit}>
                    <label >Company</label>
                    <input
                        type='text'
                        id='ticker'
                        name='ticker'
                        value={ticker}
                        disabled
                />
                    <label htmlFor='purchase_price'>Purchase price</label>
                    <input
                        type='number'
                        id='purchase_price'
                        name='purchase_price'
                        value={purchase_price}
                        placeholder='Enter purchase price'
                        onChange={onChange}
                    />
                    <label htmlFor='quantity'>Amount of shares</label>
                    <input
                        type='number'
                        id='quantity'
                        name='quantity'
                        value={quantity}
                        placeholder='Enter amount of shares'
                        onChange={onChange}
                    />
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
                    <QueryButton onClick={() => navigate('/')}>
                        Back to portfolio
                    </QueryButton>
                </FormButtonContainer>
                </form>
            </Form>
        </FormContainer>
        </>
    )
}

export default EditTrade