import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { searchCompanies } from '../utils/Api'
import axios from 'axios'
import _ from 'lodash'

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


    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    //load options using API call
    function loadOptions() {
        if (inputValue === "") return 
        console.log('searching' + inputValue)
        return axios.get(`/api/v1/companys/search?q=${inputValue}`)
        .then(result => {
            return result.data.slice(0, 20)
        })
        .catch (
            err => console.log(err)
        );
    };

    const [debounce, setDebounce] = useState({});

// Listen to changes of debounce (function, delay), when it does clear the previos timeout and set the new one.
    useEffect(() => {
        const { cb, delay } = debounce;
        if (cb) {
            const timeout = setTimeout(cb, delay);
            return () => clearTimeout(timeout); 
        }
    }, [debounce]);

    const loadOptions1 = async (value, callback) => {
        setDebounce({
            cb: async () => {
                if (value === "") return
                console.log('searching' + value)
                const data = await axios.get(`/api/v1/companys/search?q=${value}`)
                .then(result => {
                    return result.data.slice(0, 20)
                })
                console.log(data)
                callback(data);
            },
            delay: 2000 // ms
        });
    }

    return (
        <>
            <div>Add Trade page {ticker ? `ticker : ${ticker}` : null}</div>
            {/* // company information with ticker information from params */}
            <AsyncSelect
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionLabel={e => e.symbol}
                getOptionValue={e => e.symbol}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChange}
            />
            {/* // input { purchase_price, purchase_date, quantity } ( ticker and user provided) */}

            {/* // add button */}

            {/* // list of previous trades from company */}
        </>
    )
}

export default AddTrade