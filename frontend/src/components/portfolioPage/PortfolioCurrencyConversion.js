import { useState, useEffect } from "react";

// Helper functions
import { fetchCurrencies, fetchCurrencyQuote } from "../../utils/Api";
import Loader from "../sharedComponents/Loader";

// Styled Components
import { StyledHeading } from "../styles/Heading.styled";


export default function PortfolioCurrencyConversion ({user, portfolioAmount}) {

    const [ currency, setCurrency ] = useState("AUD")
    const [ currencyQuote, setCurrencyQuote ] = useState(null)
    const [ currencies, setCurrencies ] = useState(null)

    useEffect(() => {
        let isMounted = true

        fetchCurrencies(user.token)
        .then( data => {
            setCurrencies(data)
            }
        )

        return () =>  isMounted = false
    }, [user.token])

    useEffect(() => {
        let isMounted = true
        if(!currency) return
        fetchCurrencyQuote(currency ,user.token)
        .then( data => {
            setCurrencyQuote(data)
            }
        )

        return () =>  isMounted = false
    }, [currency ,user.token])

    const selectChangeHandler = (e) => {
        setCurrency(e.target.value)
    }

    let select = null

    if (currencies){
        let options = Object.keys(currencies).map(( currency ) => {
            return (
                <option value={currencies[currency].code} key={currencies[currency].code}>{currencies[currency].code} - {currencies[currency].description}</option>
            )
        }).sort((a, b) => {
            return a.key > b.key ? 1 : -1
        })
        select = (            
            <select 
                style={{ height: '2rem', textAlign: 'center', fontWeight: 700, maxWidth: '90vw'}}
                name={'currencies'} 
                id={"currencies"} 
                placeholder={'Select Currency'} 
                onChange={(e) => {selectChangeHandler(e)}}
                defaultValue={currencies ? currency : null}>
                {options}
            </select>
        )
    }

    return (
        <>
        <StyledHeading>
            <h1>
            CURRENCY CONVERSION
            </h1>
        </StyledHeading>
        <div style={{ display: 'grid', justifyContent: 'center', justifyItems: 'center'}}>
            {select ? select : <Loader/> }
            <h2 style={{ textAlign: 'center', marginBottom: '0'}}>
                ${currencyQuote ? ( currencyQuote * portfolioAmount ).toFixed(2) : '0000.00'} {currency}
            </h2>
        </div>
        </>
    )

}