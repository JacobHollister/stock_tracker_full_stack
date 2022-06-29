// Package imports
import {useEffect, useState } from 'react'

// Helper functions
import { fetchLineData } from '../../utils/Api'
import { graphLabelDataHandler } from '../../utils/graphFunctions';

// Components
import Loader from '../sharedComponents/Loader'

// react-js chart imports
import { Line } from 'react-chartjs-2'
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

export default function WatchlistGraph({ticker, chartColor}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)

    useEffect(() => {
        let isMounted = true
        setIsChartLoading(true)
        fetchLineData(ticker, 'day')
            .then(result => {
                if(!isMounted)return
                setChartData(result.data)
                setLabelData(graphLabelDataHandler(result.date, 'day'))
            })
            .catch (
                err => console.error(err)
            )
        return () => {
            isMounted = false
        }
    }, [ticker])

    useEffect(() => {
        if(chartData && labelData){
            setIsChartLoading(false)
        }
    }, [chartData, labelData])


    const graphDataProps = {
            labels: labelData,
            datasets: [
                {
                    borderColor: chartColor ? chartColor : 'grey',
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
        layout:{autoPadding: false, padding:5},
        scales: { 
            xAxes: {display: false}, 
            yAxes: {display: false}
        },
    }

    if (isChartLoading) return <></>
    return (
        <Line data={graphDataProps} options={graphOptionsProps} />
    )
}