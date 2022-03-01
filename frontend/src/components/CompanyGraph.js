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
import Loader from './Loader'

import { fetchLineData } from '../utils/Api'

import { CompanyGraphContainer, ResolutionButtonContainer, ResolutionButton } from './styles/CompanyGraph.styled'

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
    const [ chartResolution, setChartResolution ] = useState('week')

    useEffect(() => {
        loadChartContent()
        //eslint-disable-next-line
    }, [chartResolution])

    useEffect(() => {
        if(chartData && labelData){
            setIsChartLoading(false)
        }
    }, [chartData, labelData, ticker])


    const loadChartContent = async () => {
        setIsChartLoading(true)
        fetchLineData(ticker, chartResolution)
        .then(result => {
            setChartData(result.data)
            setLabelData(result.labels)
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
        layout:{autoPadding: false, padding: {
            left:0, right: 20}},
        scales: { 
            xAxes: {display: true,
                    ticks: {autoSkip: true,
                            autoSkipPadding: 100,
                            padding: 0,
                            maxRotation: 0,
                            labelOffset: 40,},
                    grid: {display: false}}, 
            yAxes: {display: true, 
                    position:'right', 
                    ticks: {
                        count: 5, 
                        padding: 0,
                    }
                }
        },
    }

    function buttonHandler(e) {
        setChartResolution(e.target.value)
    }
    
    return (
        <CompanyGraphContainer>
            <ResolutionButtonContainer>
                <ResolutionButton active={chartResolution === 'day' ? true : false} value={'day'} onClick={buttonHandler}>DAY</ResolutionButton>
                <ResolutionButton active={chartResolution === 'week' ? true : false} value={'week'} onClick={buttonHandler}>WEEK</ResolutionButton>
                <ResolutionButton active={chartResolution === 'month' ? true : false} value={'month'} onClick={buttonHandler}>MONTH</ResolutionButton>
                <ResolutionButton active={chartResolution === 'year' ? true : false} value={'year'} onClick={buttonHandler}>YEAR</ResolutionButton>
            </ResolutionButtonContainer>
            {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps} />}
        </CompanyGraphContainer>
    )
}

export default CompanyGraph;