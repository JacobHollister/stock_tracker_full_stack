// Package imports
import { useEffect, useState } from 'react';

// Components
import Loader from '../sharedComponents/Loader'

// react-js chart imports
import {
    Chart as ChartJS,
    ArcElement,
    DoughnutController,
    PieController,
    CategoryScale,
    Legend,
    Title,
    Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

// ChartJs setup
ChartJS.register(
    ArcElement,
    DoughnutController,
    PieController,
    CategoryScale,
    Legend,
    Title,
    Tooltip,
); 


export default function PortfolioDoughnutGraph({data, tradedHoldings}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)

    useEffect(() => {
        setIsChartLoading(true)
        if(Object.keys(data).length > 0 && Object.keys(tradedHoldings).length > 0){
            doughnutGraphHandler(data, tradedHoldings)
            setIsChartLoading(false)
        }
    },[data, tradedHoldings])

    const doughnutGraphHandler = (data, tradedHoldings) => {
        let labels = []
        let graphData = []
        Object.keys(data).forEach((holding) => {
            labels.push(holding)
            const graphDataAmount = (tradedHoldings[holding] * data[holding].data[data[holding].data.length -1]).toFixed(2)
            graphData.push(parseFloat(graphDataAmount))
        })

        setChartData(graphData)
        setLabelData(labels)
    }

    const graphDataProps = {
        datasets: [{
            data: chartData,
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            "#198754"
            ],
        }],

        labels: labelData
    }
    
    const graphOptionsProps = {
        responsive: true,
        maintainAspectRatio: false,


    }

    return (
    <>
        {isChartLoading ? <Loader/> :<Doughnut data={graphDataProps} options={graphOptionsProps} width={200}/>}
    </>
    )
}