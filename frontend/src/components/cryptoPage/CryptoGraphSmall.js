// Package imports
import {useEffect, useState } from 'react'

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

export default function CryptoGraphSmall({data, labels}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)

    useEffect(() => {
        if(data && labels && data.length > 0 && labels.length > 0){
            setIsChartLoading(false)
        }
    }, [data, labels])


    const graphDataProps = {
            labels: labels,
            datasets: [
                {
                    borderColor: '#0492C2',
                    data: data, 
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