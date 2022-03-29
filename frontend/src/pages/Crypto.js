// Package imports
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector } from 'react-redux'

// Components
import CryptoCard from '../components/cryptoPage/CryptoCard'

// Styled Components
import { StyledHeading } from '../components/styles/Heading.styled'

// Supported CyrptoCurrencies
const supportedCurrencies  = {
    'BTC': "bitcoin",
    'ETH': "ethereum",
    'ADA': "cardano", 
    'SOL': "solana", 
    'LUNA': "terra-luna", 
    'DOT': "polkadot", 
    'DOGE': "dogecoin"}

export default function Watchlist() {

    const navigate = useNavigate()
    
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
        navigate('/login')
        }
    }, [user, navigate])

    const CyrptoCurrencies = Object.keys(supportedCurrencies).map((symbol) => {
        return (
            <CryptoCard symbol={symbol} name={supportedCurrencies[symbol]} key={symbol}/>
        )
    })

    return (
        <>
        <StyledHeading>
            <h1>
            CRYTPOCURRENCIES
            </h1>
        </StyledHeading>
        {CyrptoCurrencies}
        <div style={{color: 'grey', padding:'1rem'}}>* Prices are to USDT pairing</div>
        </>
    )
}