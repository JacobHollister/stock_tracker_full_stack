// Package imports
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { confirm_add } from '../features/trades/tradesSlice'

// Helper functions
import { } from '../utils/Api'

// Components


// Styled Components
import { ButtonLarge } from '../components/styles/UI.styled'
import { StyledHeading } from "../components/styles/Heading.styled"
import { 
    Form, 
    FormContainer, 
    FormButtonContainer, 
    QueryButton 
} from '../components/styles/Form.styled'

export default function AddTrade() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate, dispatch])

    const {symbol} = useParams()

    const [tickerInfo, setTickerInfo] = useState(null)
    const [formData, setFormData] = useState({
        symbol: '',
        purchase_price: '',
        purchase_date: '',
        quantity: '',
    })

    const {purchase_price, purchase_date, quantity }= formData

    // useEffect(() => {
    //     if(ticker){
    //         fetchCompanyInfo(ticker).then((info) => {
    //             setTickerInfo(`${info.ticker} : ${info.name}`)
    //         })
    //     setFormData((prevState) => ({
    //         ...prevState,
    //         ticker,
    //     }))
    //     }
    // }, [ticker])
    

    const onChange = (e) => {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(formData.ticker && formData.purchase_price && formData.quantity && formData.purchase_date) {
            dispatch(confirm_add(formData))
        } else {
            console.log('not all fields filled out')
        }
    }

    return (
        <>
        <FormContainer>
            <StyledHeading>
                <h1>
                    ADD CRYPTOCURRENCY TRADE
                </h1>
            </StyledHeading>
            <Form>
                <form onSubmit={onSubmit}>
                    <label >Currency</label>
                        <input
                            type='text'
                            id='ticker'
                            name='ticker'
                            placeholder={tickerInfo ? tickerInfo : symbol}
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
                    <label htmlFor='quantity'>Amount</label>
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
                    Add trade
                    </ButtonLarge>
                    { symbol ? 
                    (<QueryButton onClick={() => navigate('/crypto')}>
                        Different currency?
                    </QueryButton>)
                    :
                    (null) 
                    }
                </FormButtonContainer>
                </form>
            </Form>
        </FormContainer>
        </>
    )
}