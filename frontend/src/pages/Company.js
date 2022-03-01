import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { fetchCompanyInfo, fetchQuote } from '../utils/Api'

import CompanyInfo from '../components/CompanyInfo'
import CompanyGraph from '../components/CompanyGraph'
import News from '../components/News'

import { CompanyContainer, CompanyHeading, SuccessButton, WatchlistButton} from '../components/styles/Company.styled'

function Company() {
    const {ticker} = useParams()

    const [ quote, setQuote] = useState(null)
    const [ companyInfo, setCompanyInfo] = useState(null)
    const [ chartColor, setChartColor ] = useState(null)

    useEffect(() => {
        loadData()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        
        const dangerFill = '#d9534f';
        const successFill =  '#5cb85c'; 

        if (quote && quote.dp < 0){
            setChartColor(dangerFill)
        } else if (quote && quote.dp > 0) {
            setChartColor(successFill)
        }
    }, [quote])

    const loadData = async () => {
        fetchQuote(ticker)
        .then(result => {
            setQuote(result)
        })
        .catch (
            err => console.error(err)
        )
        fetchCompanyInfo(ticker)
        .then(result => {
            setCompanyInfo(result)
        })
        .catch (
            err => console.error(err)
        )
    }

    function quoteChangeHandler() {
        const changeDirection = ( quote.dp > 0 ) ? '+' : "-"
        const changeAmount = Math.abs(quote.d.toFixed(2))
        const changePercentage = Math.abs(quote.dp.toFixed(2))
        return `${changeDirection}$${changeAmount} (${changeDirection}${changePercentage}%) Day` 

    }

    return (
        <>
        <CompanyContainer>
                <CompanyHeading color={chartColor}>
                    <h1>
                        <span>{ticker.toUpperCase()} | {companyInfo ? companyInfo.name : ""}</span>
                    </h1>
                    <WatchlistButton>Add to watchlist</WatchlistButton>
                    <h2>
                        <span>${quote ? quote.c.toFixed(2) : '0.0'}</span>
                        <span >{quote ? quoteChangeHandler() : '0.0'}</span>
                    </h2>
                    <SuccessButton>ADD</SuccessButton>
                </CompanyHeading>
                <div></div>
            <CompanyGraph ticker={ticker} chartColor={chartColor}/>
            <CompanyInfo quote={quote} companyInfo={companyInfo}/>
        </CompanyContainer>
        <News ticker={ticker}/>
        </>
    )
}

export default Company