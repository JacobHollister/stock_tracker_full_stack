// Package imports
import {useEffect, useState} from 'react'

// Components
import Loader from '../sharedComponents/Loader'

// Styled Components
import {SmallGraphContainer, SmallGraphHeading} from '../styles/Markets.styled'

// Helper functions
import { fetchCryptoLineData } from '../../utils/Api'
import { GraphChangeHandler, graphColourHandler } from '../../utils/graphFunctions';

// react-js chart imports
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'

// ChartJs setup
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function CryptoGraph({symbol, name}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)
    const [ changePercentage, setChangePercentage ] = useState(null)
    const [ chartColor, setChartColor ] = useState(null)

    useEffect(() => {
        let mounted = true

        setIsChartLoading(true)
        
        fetchCryptoLineData(symbol, 'day')
        .then(result => {
            if(!mounted) return
            const [changeAmount, changePercentageString] = GraphChangeHandler(result.data)
            setChangePercentage(changePercentageString)
            setChartColor(graphColourHandler(changeAmount))
            setChartData(result.data)
            setLabelData(result.date)
        })
        .catch (
            err => console.error(err)
        )

        return () => mounted = false

    }, [symbol])

    useEffect(() => {
        if(chartData && labelData){
            setIsChartLoading(false)
        }
    }, [chartData, labelData, symbol])

    const graphDataProps = {
            labels: labelData,
            datasets: [
                {
                    //borderColor: chartColor,
                    borderColor: '#0492C2',
                    data: chartData, 
                    fill: true,
                    borderWidth: '2',
                    tension: .3,
                    pointRadius: '0',
                    pointHoverBorderWidth: '0'
        }]}
    
    const graphOptionsProps = {
        maintainAspectRatio: false,
        plugins: {legend: {display: false}, tooltip: {enabled: false}}, 
        layout:{autoPadding: false, padding:20},
        scales: { 
            xAxes: {display: false}, 
            yAxes: {display: true, position:'right', ticks: {count: 3, padding: 0}}
        },
    }

    
    return (
        <SmallGraphContainer>
            <SmallGraphHeading>
                <span>{name}</span>
                <span>{symbol} </span>
                <span style={{color: chartColor, fontWeight: 700}}> {changePercentage ? changePercentage : '0.0'}%</span>
            </SmallGraphHeading>
            <div>
                {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps} />}
            </div>
        </SmallGraphContainer>
    )
}
