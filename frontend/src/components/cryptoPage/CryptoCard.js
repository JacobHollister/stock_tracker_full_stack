// Package imports
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Helper functions
import { fetchCryptoLineData } from '../../utils/Api'
import { GraphChangeHandler, graphColourHandler } from '../../utils/graphFunctions';

// Components
import CryptoGraphSmall from './CryptoGraphSmall'

// Styled Components
import { SlimCard } from '../styles/Watchlist.styled'
import { CardOverlay } from '../styles/Crypto.styled'
import { ButtonLarge } from '../styles/UI.styled';


export default function CryptoCard({symbol, name}) {
    const navigate = useNavigate()

    const  [ displayOverlay, setDisplayOverlay ] = useState(false)

    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)
    const [ changePercentage, setChangePercentage ] = useState(null)
    const [ price, setPrice ] = useState(null)
    const [ chartColor, setChartColor ] = useState(null)

    useEffect(() => {
        let mounted = true
        
        fetchCryptoLineData(symbol, 'day')
        .then(result => {
            if(!mounted) return
            const [changeAmount, changePercentageString] = GraphChangeHandler(result.data)
            setChangePercentage(changePercentageString)
            setPrice(result.data[result.data.length -1])
            setChartColor(graphColourHandler(changeAmount))
            setChartData(result.data)
            setLabelData(result.date)
        })
        .catch (
            err => console.error(err)
        )

        return () => mounted = false

    }, [symbol])

    return (
        <div style={{position: 'relative'}}>
            { displayOverlay ? (
                <CardOverlay display={displayOverlay} onClick={() => setDisplayOverlay(false)}>
                    <ButtonLarge color={'success'} onClick={() => navigate('/')}>
                        ADD
                    </ButtonLarge>
                    <ButtonLarge onClick={() => navigate(`/crypto/${name}`)}>
                        INFO
                    </ButtonLarge>
                </CardOverlay>
            ) : (
                null
            )}
            <SlimCard color={chartColor} onClick={() => setDisplayOverlay(true)}>
                <h3>
                    <span>{name.toUpperCase()}</span>
                    <span> - </span>
                    <span>{symbol}</span>
                </h3>
                <div>
                <CryptoGraphSmall chartColor={chartColor} data={chartData} labels={labelData}/>
                </div>
                <h4>
                <span>${price ? price : '0.0'} </span>
                <span >({changePercentage ? changePercentage : '0.0'})%</span>
                </h4>
            </SlimCard>
        </div>
    )
}