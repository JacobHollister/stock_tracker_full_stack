import { useEffect, useState } from 'react';
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
import axios from 'axios'
import Loader from './Loader'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function CompanyGraph({ticker, chartColor}) {


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
        axios.get(`http://localhost:5000/api/v1/stock/line?ticker=${ticker}&resolution=day`)
        .then(result => {
            setChartData(result.data.data)
            setLabelData(result.data.labels)
        })
        .catch (
            err => console.error(err)
        )
    }

    const graphDataProps = {
            labels: labelData,
            datasets: [
                {
                    borderColor: chartColor ? chartColor : "grey",
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
            xAxes: {display: true, ticks: {autoSkip: true, autoSkipPadding: 100, padding: 0}}, 
            yAxes: {display: true, position:'right', ticks: {count: 3, padding: 0}}
        },
    }

    
    return (
        <div>
            {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps} />}
        </div>
    )
}

export default CompanyGraph;