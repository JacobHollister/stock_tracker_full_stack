// Package imports
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'

// Helper functions
import { fetchCryptoInfo } from '../utils/Api'
import { graphColourHandler, cryptoChangeHandler } from '../utils/graphFunctions'

// Components
import CryptoGraphLarge from '../components/cryptoCurrencyPage/CryptoGraphLarge'
import CryptoInfo from '../components/cryptoCurrencyPage/CryptoInfo'

// Assets / Icons


// Styled Components
import { ButtonLarge, BackButton } from '../components/styles/UI.styled'
import { 
    CryptoContainer, 
    CryptoHeading} 
from '../components/styles/Crypto.styled'


export default function CryptoCurrency() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { name } = useParams()
    const { user } = useSelector((state) => state.auth)

    const [ cryptoInfo, setCryptoInfo] = useState(null)
    const [ chartColour, setChartColour ] = useState(null)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    
    useEffect(() => {
        let isMounted = true

        fetchCryptoInfo(name, user.token)
        .then(result => {
            if(!isMounted) return
            setCryptoInfo(result)
            setChartColour(graphColourHandler(result.change))
        })
        .catch (
            err => console.error(err)
        )

        return () => isMounted = false
    }, [name, user])


    return (
        <>
        <CryptoContainer>
            <BackButton onClick={() => navigate(-1)}> BACK</BackButton>
                <CryptoHeading color={chartColour}>
                    <h1>
                        <span>{cryptoInfo ? cryptoInfo.shortName.toUpperCase() : null} | {cryptoInfo ? cryptoInfo.name : ""}</span>
                    </h1>
                    <h2>
                        <span>${cryptoInfo ? cryptoInfo.currentPrice : '0.0'}</span>
                        <span >{cryptoInfo ? cryptoChangeHandler(cryptoInfo.changePercentage) : '0.0'}</span>
                    </h2>
                    <ButtonLarge color={'success'} onClick={() => navigate('/addtrade/' + name)}>ADD</ButtonLarge>
                </CryptoHeading>
            <CryptoGraphLarge symbol={cryptoInfo ? cryptoInfo.shortName : null} token={user.token}/>
            <CryptoInfo info={cryptoInfo}/>
        </CryptoContainer>
        </>
    )
}