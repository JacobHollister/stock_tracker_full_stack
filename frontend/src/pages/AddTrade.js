import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { searchCompanies } from '../utils/Api'
import { Form, FormContainer, FormButtonContainer, QueryButton } from '../components/styles/Form.styled'
import { SuccessButton } from '../components/styles/Company.styled'
import { StyledHeading } from "../components/styles/Heading.styled"

const AddTrade = () => {
    const navigate = useNavigate()
    
    const { user } = useSelector((state) => state.auth)
    
    useEffect(() => {

        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    const {ticker} = useParams()

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [debounce, setDebounce] = useState({});
    const [formData, setFormData] = useState({
        symbol: '',
        purchasePrice: '',
        purchaseDate: '',
        amount: '',
    })

    const {purchasePrice, purchaseDate, amount }= formData

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
            symbol: value.symbol,
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
        <FormContainer>
            <StyledHeading>
                <h1>
                    ADD A TRADE
                </h1>
            </StyledHeading>
            {/* // company information with ticker information from params */}
            {/* // input { purchase_price, purchase_date, quantity } ( ticker and user provided) */}
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
                        
                    <label htmlFor='purchasePrice'>Purchase price</label>
                    <input
                        type='number'
                        id='purchasePrice'
                        name='purchasePrice'
                        value={purchasePrice}
                        placeholder='Enter purchase price'
                        onChange={onChange}
                    />
                    <label htmlFor='amount'>Amount of shares</label>
                    <input
                        type='number'
                        id='amount'
                        name='amount'
                        value={amount}
                        placeholder='Enter amount of shares'
                        onChange={onChange}
                    />
                    <label htmlFor='purchaseDate'>Purchased date</label>
                    <input
                        type='date'
                        id='purchaseDate'
                        name='purchaseDate'
                        value={purchaseDate}
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
            {/* // list of previous trades from company */}
            
        </FormContainer>
    )
}

export default AddTrade