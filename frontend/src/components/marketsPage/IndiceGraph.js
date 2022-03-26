// Package imports
import {useEffect, useState} from 'react'

// Components
import Loader from '../sharedComponents/Loader'

// Styled Components
import {IndiceGraphContainer, IndiceGraphHeading} from '../styles/IndiceGraph.styled'

// Helper functions
import { fetchQuote, fetchLineData } from '../../utils/Api'
import { graphColourHandler } from '../../utils/graphFunctions';

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

export default function IndiceGraph({ticker, indice}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)
    const [ quoteData, setQuoteData ] = useState(null)
    const [ chartColor, setChartColor ] = useState(null)

    useEffect(() => {
        let mounted = true

        setIsChartLoading(true)
        
        fetchLineData(ticker, 'day')
        .then(result => {
            if(!mounted) return
            setChartData(result.data)
            setLabelData(result.labels)
        })
        .catch (
            err => console.error(err)
        )
        fetchQuote(ticker.toUpperCase())
        .then(result => {
            if(!mounted) return
            setQuoteData(result)
        })
        .catch (
            err => console.error(err)
        )

        return () => mounted = false

    }, [ticker])

    useEffect(() => {
        if(chartData && labelData && quoteData){
            setChartColor(graphColourHandler(quoteData.dp))
            setIsChartLoading(false)
        }
    }, [chartData, labelData, quoteData, ticker])

    const graphDataProps = {
            labels: labelData,
            datasets: [
                {
                    borderColor: chartColor,
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
        <IndiceGraphContainer>
            <IndiceGraphHeading>
                <span>{indice}</span>
                <span>{ticker} </span>
                <span style={{color: chartColor}}> {quoteData ? quoteData.dp.toFixed(2) : '0.0'}%</span>
            </IndiceGraphHeading>
            <div>
                {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps} />}
            </div>
        </IndiceGraphContainer>
    )
}
