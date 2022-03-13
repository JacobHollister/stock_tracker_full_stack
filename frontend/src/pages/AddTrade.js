import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addTrade } from '../features/trades/tradesSlice'
import AsyncSelect from 'react-select/async'
import { searchCompanies } from '../utils/Api'
import { Form, FormContainer, FormButtonContainer, QueryButton } from '../components/styles/Form.styled'
import { SuccessButton } from '../components/styles/Company.styled'
import { StyledHeading } from "../components/styles/Heading.styled"
import TradeDetails from '../components/TradeDetails'

const AddTrade = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { trade, isLoading, isError, isSuccess, message  } = useSelector((state) => state.trades)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate, dispatch])

    const {ticker} = useParams()

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [debounce, setDebounce] = useState({});
    const [ previousTrades, setPreviousTrades ] = useState([])
    const [formData, setFormData] = useState({
        ticker: '',
        purchase_price: '',
        purchase_date: '',
        quantity: '',
    })

    const {purchase_price, purchase_date, quantity }= formData

    useEffect(() => {
        if(isError) {
            console.log(message)
        }
        if(isSuccess) {
            console.log('sucessfully added trade')
            navigate('/portfolio')
        }
    }, [isError, isSuccess, message, navigate])

    useEffect(() => {
        const { cb, delay } = debounce;
        if (cb) {
            const timeout = setTimeout(cb, delay);
            return () => clearTimeout(timeout); 
        }
    }, [debounce]);

    const loadOptions = async (value) => {
        return new Promise((resolve, reject) => {
            setDebounce({
                cb: async () => {
                    if (value === "") return
                    console.log('searching ', value )
                    const data = await searchCompanies(value)
                    .then(result => {
                        return result.data.slice(0, 20)
                    })
                    resolve(data);
                },
                delay: 2000
            })
        });
    }

    const handleInputChange = (value, {action}) => {
        if(action !== "input-blur" && action !== "menu-close") {
            setValue(value);
        }
    };
    
    const handleChange = value => {
        setSelectedValue(value.symbol);
        setFormData((prevState) => ({
            ...prevState,
            ticker: value.symbol,
        }))
    }


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
            dispatch(addTrade(formData))
        } else {
            console.log('not all fields filled out')
        }

        // dispatch()
    }

    const selectOptions = {
        customStyles : {
            container: (provided, state) => ({
            ...provided,
            margin: '.5rem 0 1rem',
        })},
        customTheme : (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: 'neutral80',
            primary: 'neutral80',
        }})
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
                    { ticker ? (
                        <div>{ticker}</div>
                        ) : (
                        <div>
                            <AsyncSelect
                            cacheOptions
                            placeholder={'Please select company'}
                            inputValue={inputValue}
                            getOptionLabel={e => e.symbol + " : " + e.description}
                            getOptionValue={e => e.symbol}
                            loadOptions={loadOptions}
                            onInputChange={handleInputChange}
                            onChange={handleChange}
                            noOptionsMessage={() => "No results"}
                            styles={selectOptions.customStyles}
                            theme={selectOptions.customTheme}
                        />
                    </div>
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
                    <SuccessButton type='submit'>
                    Add trade
                    </SuccessButton>
                    { ticker ? 
                    (<QueryButton onClick={() => navigate('/addtrade')}>
                        Different company?
                    </QueryButton>)
                    :
                    (null) 
                    }
                </FormButtonContainer>
                </form>
            </Form>
        </FormContainer>
        {/* // list of previous trades from company */}
        </>
    )
}

export default AddTrade