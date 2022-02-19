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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function IndiceGraph({ticker}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)

    useEffect(() => {
        loadChartContent()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(chartData && labelData){
            setIsChartLoading(false)
        }
    }, [chartData, labelData, ticker])


    const loadChartContent = async () => {
        setIsChartLoading(true)
        axios.get(`http://localhost:5000/api/v1/stock/line?ticker=${ticker}&resolution=week`)
        .then(result => {
            setChartData(result.data.data)
            setLabelData(result.data.labels)
        })
        .catch (
            err => console.error(err)
        )
    }

    
    return (
        <div>
            {isChartLoading ? <div>loading</div> :<Line                
                data={{
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
                }]}} 
                options={{ 
                    maintainAspectRatio: false,  
                    plugins: {legend: {display: false}}, 
                    tooltips: {
                        displayColors: false
                    },
                    layout:{autoPadding: false, padding:10},
                    scales: {
                        xAxes: {display: false}, 
                        yAxes: {display: true, ticks: {count: 4, padding: 0}}
                    },
                }}
            />}
        </div>
    )
}
