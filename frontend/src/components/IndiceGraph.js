import React, {useEffect, useState} from 'react'
import axios from 'axios'
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

import {IndiceGraphContainer, IndiceGraphHeading} from './styles/IndiceGraph.styled'
import Loader from '../components/Loader'

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

    useEffect(() => {
        loadChartContent()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(chartData && labelData && quoteData){
            setIsChartLoading(false)
        }
    }, [chartData, labelData, quoteData, ticker])


    const loadChartContent = async () => {
        setIsChartLoading(true)
        axios.get(`http://localhost:5000/api/v1/stock/line?ticker=${ticker}&resolution=day`)
        .then(result => {
            setChartData(result.data.data)
            setLabelData(result.data.labels)
        })
        .catch (
            err => console.error(err)
        )
        axios.get(`http://localhost:5000/api/v1/stock/quote/${ticker.toUpperCase()}`)
        .then(result => {
            setQuoteData(result.data)
        })
        .catch (
            err => console.error(err)
        )
    }

    const graphDataProps = {
            labels: labelData,
            datasets: [
                {
                    //backgroundColor: chartData ? chartColorHandler() : null,
                    data: chartData, 
                    fill: true,
                    borderColor: '#92949c',
                    borderWidth: '2',
                    tension: .3,
                    pointRadius: '0',
                    pointHoverBorderWidth: '0'
        }]}
    
    const graphOptionsProps = {
        maintainAspectRatio: false,  
        plugins: {legend: {display: false}}, 
        tooltips: {
            displayColors: false
        },
        layout:{autoPadding: false, padding:10},
        scales: {
            xAxes: {display: false}, 
            yAxes: {display: true, position:'right', ticks: {count: 4, padding: 0}}
        },
    }
    
    return (
        <IndiceGraphContainer>
            <IndiceGraphHeading>
                <span>{indice}</span>
                <span>{ticker} ({quoteData ? quoteData.dp.toFixed(2) : '0.0'}%)</span>
            </IndiceGraphHeading>
            <div>
                {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps}/>}
            </div>
        </IndiceGraphContainer>
    )
}
