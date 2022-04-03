import { useState, useEffect } from "react";

// Helper functions
import { fetchCurrencies, fetchCurrencyQuote } from "../../utils/Api";

// Styled Components
import { StyledHeading } from "../styles/Heading.styled";


export default function PortfolioCurrencyConversion ({user}) {

    const [ currency, setCurrency ] = useState(null)
    const [ currencyQuote, setCurrencyQuote ] = useState(null)
    const [ currencies, setCurrencies ] = useState(null)

    useEffect(() => {
        let isMounted = true

        fetchCurrencies(user.token)
        .then( data => {
            setCurrencies(data.results)
            }
        )

        return () =>  isMounted = false
    }, [user.token])

    useEffect(() => {
        let isMounted = true
        if(!currency) return
        fetchCurrencyQuote(currency ,user.token)
        .then( data => {
            setCurrencyQuote(data[`USD_${currency}`])
            }
        )

        return () =>  isMounted = false
    }, [currency ,user.token])

    const selectChangeHandler = (e) => {
        setCurrency(e.target.value)
    }

    let options

    if (currencies){
        options = Object.keys(currencies).map(( currency ) => {
            return (
                <option value={currencies[currency].id} key={currencies[currency].id}>{currencies[currency].id} - {currencies[currency].currencyName}</option>
            )
        }).sort((a, b) => {
            return a.key > b.key ? 1 : -1
        })
    }

    return (
        <>
        <StyledHeading>
            <h1>
            CURRENCY CONVERSION
            </h1>
        </StyledHeading>
        <div>
            <select name={'currencies'} id={"currencies"} placeholder={'Select Currency'} onChange={(e) => {selectChangeHandler(e)}}>
                {options}
            </select>
            <h3>
                {currencyQuote}
            </h3>
        </div>
        </>
    )

}