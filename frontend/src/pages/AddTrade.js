// Package imports
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { confirm_add } from '../features/trades/tradesSlice'

// Helper functions
import { searchCompanies, fetchCompanyInfo, fetchCryptoInfo } from '../utils/Api'

// Components
import AsyncSelect from 'react-select/async'

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
    const [searchParams] = useSearchParams();

    // Check user is logged in
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate, dispatch])

    const [ticker, setTicker] = useState(null)
    const [symbol, setSymbol] = useState(null)
    const [tickerInfo, setTickerInfo] = useState(null)
    const [symbolInfo, setSymbolInfo] = useState(null)
    const [inputValue, setValue] = useState('');
    const [debounce, setDebounce] = useState({});
    const [formData, setFormData] = useState({
        ticker: '',
        symbol: '',
        pairingSymbol: 'USDT',
        purchase_price: '',
        purchase_date: '',
        quantity: '',
    })
    const {purchase_price, purchase_date, quantity } = formData
    
    useEffect(() => {
        const queryParams = Object.fromEntries([...searchParams])
        if(queryParams.ticker) setTicker(queryParams.ticker)
        if(queryParams.symbol) setSymbol(queryParams.symbol)
    }, [searchParams])

    useEffect(() => {
        if(ticker){
            fetchCompanyInfo(ticker).then((info) => {
                setTickerInfo(`${info.ticker} : ${info.name}`)
            })
        setFormData((prevState) => ({
            ...prevState,
            ticker,
        }))
        }
    }, [ticker])

    useEffect(() => {
        if(symbol){
            fetchCryptoInfo(symbol, user.token)
            .then(result => {
                setSymbolInfo(`${result.shortName.toUpperCase()} - ${result.name}`)
                setFormData((prevState) => ({
                    ...prevState,
                    symbol: result.shortName,
                }))
            })
        }
    }, [symbol, user])

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

        if((formData.ticker || (formData.symbol && formData.pairingSymbol)) && purchase_price && quantity && purchase_date) {
            if(symbol){
                const cryptoFormData = {
                    symbol: formData.symbol,
                    pairingSymbol: formData.pairingSymbol,
                    purchase_price,
                    purchase_date,
                    quantity
                }
                dispatch(confirm_add(cryptoFormData))
            } else if(formData.ticker) {
                const stockFormData = {
                    ticker: formData.ticker,
                    purchase_price,
                    purchase_date,
                    quantity
                }
                dispatch(confirm_add(stockFormData))
            }
        } else {
            console.log('not all fields filled out')
        }
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
                    { ticker ? (
                        <>
                            <label >Company</label>
                            <input
                                type='text'
                                id='ticker'
                                name='ticker'
                                placeholder={tickerInfo ? tickerInfo : ticker}
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
                                placeholder={symbolInfo ? symbolInfo : symbol}
                                disabled
                                />
                                <label >Currency Pairing</label>
                                <input
                                type='text'
                                id='pairingSymbol'
                                name='pairingSymbol'
                                placeholder={formData.pairingSymbol}
                                disabled
                                />
                            </>
                        ) : (
                            null
                        )}
                        { (!symbol && !ticker) ? (
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
                        ) : null}
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
                    Add trade
                    </ButtonLarge>
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
        </>
    )
}