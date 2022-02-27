import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import CompanyGraph from '../components/CompanyGraph'
import CompanyNews from '../components/CompanyNews'
import CompanyInfo from '../components/CompanyInfo'
import { CompanyContainer, CompanyHeading} from '../components/styles/Company.styled'

function Company() {
    const {ticker} = useParams()

    const [quote, setQuote] = useState(null)
    const [ chartColor, setChartColor ] = useState(null)

    useEffect(() => {
        getQuote()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        
        const dangerFill = '#eb0f29';
        const successFill =  '#00873c'; 

        if (quote && quote.dp < 0){
            setChartColor(dangerFill)
        } else if (quote && quote.dp > 0) {
            setChartColor(successFill)
        }
    }, [quote])

    const getQuote = async () => {
        axios.get(`http://localhost:5000/api/v1/stock/quote/${ticker.toUpperCase()}`)
        .then(result => {
            setQuote(result.data)
        })
        .catch (
            err => console.error(err)
        )
    }

    return (
        <>
        <CompanyHeading>
            <h1>
                {ticker.toUpperCase()} | Company name
            </h1>
            <h2>
                <span>${quote ? quote.c.toFixed(2) : '0.0'}</span>
                <span style={{color: chartColor, fontSize: '1rem', fontWeight: '600'}}>+${quote ? quote.d.toFixed(2) : '0.0'} (+{quote ? quote.dp.toFixed(2) : '0.0'}%)</span>
            </h2>
        </CompanyHeading>
        
        <CompanyContainer>
            <CompanyGraph ticker={ticker} chartColor={chartColor}/>
            <CompanyInfo/>
        </CompanyContainer>
        <CompanyNews ticker={ticker}/>
        </>
    )
  }
  
  export default Company