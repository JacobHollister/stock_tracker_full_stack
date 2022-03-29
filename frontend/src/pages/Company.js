// Package imports
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { addToWatchList, removeFromWatchList } from '../features/watchlist/watchlistSlice'

// Helper functions
import { fetchCompanyInfo, fetchQuote } from '../utils/Api'
import { graphColourHandler, quoteChangeHandler } from '../utils/graphFunctions'

// Components
import CompanyInfo from '../components/companyPage/CompanyInfo'
import CompanyGraph from '../components/companyPage/CompanyGraph'
import News from '../components/sharedComponents/News'

// Assets / Icons
import { CgAdd} from 'react-icons/cg'
import { MdOutlineCancel } from 'react-icons/md'

// Styled Components
import { ButtonLarge, BackButton } from '../components/styles/UI.styled'
import { 
    CompanyContainer, 
    CompanyHeading, 
    WatchlistButton} 
from '../components/styles/Company.styled'


export default function Company() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { ticker } = useParams()
    const { user } = useSelector((state) => state.auth)
    const { watchlist } = useSelector((state) => state.watchlist)

    const [ quote, setQuote] = useState(null)
    const [ companyInfo, setCompanyInfo] = useState(null)
    const [ chartColor, setChartColor ] = useState(null)


    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        let isMounted = true

        fetchQuote(ticker)
        .then(result => {
            if(!isMounted) return
            setQuote(result)
            setChartColor(graphColourHandler(result.dp))
        })
        .catch (
            err => console.error(err)
        )
        fetchCompanyInfo(ticker)
        .then(result => {
            if(!isMounted) return
            setCompanyInfo(result)
        })
        .catch (
            err => console.error(err)
        )

        return () => isMounted = false
    }, [ticker])

    const onAddToWatchlist = () => {
        dispatch(addToWatchList(ticker))
    }

    const removeFromWatchlist = () => {
        dispatch(removeFromWatchList(ticker))
    }

    return (
        <>
        <CompanyContainer>
            <BackButton onClick={() => navigate(-1)}> BACK</BackButton>
            <CompanyHeading color={chartColor}>
                <h1>
                    <span>{ticker.toUpperCase()} | {companyInfo ? companyInfo.name : ""}</span>
                </h1>
                { watchlist.includes(ticker) ? (
                    <WatchlistButton onClick={removeFromWatchlist}>
                        <MdOutlineCancel/> Remove from watchlist
                    </WatchlistButton>
                ) : (
                    <WatchlistButton onClick={onAddToWatchlist}>
                        <CgAdd/>Add to watchlist
                    </WatchlistButton>
                )}
                <h2>
                    <span>${quote ? quote.c.toFixed(2) : '0.0'}</span>
                    <span >{quote ? quoteChangeHandler(quote) : '0.0'}</span>
                </h2>
                <ButtonLarge color={'success'} onClick={() => navigate('/addtrade/' + ticker)}>ADD</ButtonLarge>
            </CompanyHeading>
            <CompanyGraph ticker={ticker} chartColor={chartColor}/>
            <CompanyInfo quote={quote} companyInfo={companyInfo}/>
        </CompanyContainer>
        <News ticker={ticker}/>
        </>
    )
}