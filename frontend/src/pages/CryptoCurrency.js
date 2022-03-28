// Package imports
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'

// Helper functions
import { fetchCryptoInfo } from '../utils/Api'
import { quoteChangeHandler, graphColourHandler } from '../utils/graphFunctions'

// Components
import CompanyInfo from '../components/companyPage/CompanyInfo'
import CompanyGraph from '../components/companyPage/CompanyGraph'
import News from '../components/sharedComponents/News'

// Assets / Icons


// Styled Components
import { ButtonLarge } from '../components/styles/UI.styled'
import { 
    CryptoContainer, 
    CryptoHeading} 
from '../components/styles/Crypto.styled'


export default function CryptoCurrency() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { symbol } = useParams()
    const { user } = useSelector((state) => state.auth)

    const [ CryptoInfo, setCryptoInfo] = useState(null)
    const [ chartColour, setChartColour ] = useState(null)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    
    useEffect(() => {
        let isMounted = true

        fetchCryptoInfo(symbol, user.token)
        .then(result => {
            if(!isMounted) return
            setCryptoInfo(result)
            setChartColour(graphColourHandler(result.change))
            console.log(result)
        })
        .catch (
            err => console.error(err)
        )

        return () => isMounted = false
    }, [symbol, user])


    return (
        <>
        <CryptoContainer>
                <CryptoHeading color={chartColour}>
                    <h1>
                        <span>{CryptoInfo ? CryptoInfo.shortName.toUpperCase() : null} | {CryptoInfo ? CryptoInfo.name : ""}</span>
                    </h1>
                    <ButtonLarge color={'success'} onClick={() => navigate('/addtrade/' + symbol)}>ADD</ButtonLarge>
                    <h2>
                        <span>${CryptoInfo ? CryptoInfo.currentPrice : '0.0'}</span>
                        <span >{CryptoInfo ? CryptoInfo.changePercentage.toFixed(2) : '0.0'}</span>
                    </h2>
                </CryptoHeading>
            {/* <CompanyGraph ticker={symbol} chartColor={chartColor}/>
            <CompanyInfo quote={quote} companyInfo={companyInfo}/> */}
        </CryptoContainer>
        </>
    )
}