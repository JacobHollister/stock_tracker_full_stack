// Package imports
import { useEffect, useState } from 'react';

// Helper functions
import { fetchCryptoLineData } from '../../utils/Api'
import { graphLabelDataHandler } from '../../utils/graphFunctions';

// Components
import Loader from '../sharedComponents/Loader'

// Styled Components
import { 
    ResolutionButtonContainer, 
    ResolutionButton,
    GraphContainer 
} from '../styles/CompanyGraph.styled'

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


export default function CompanyGraph({symbol, token}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)
    const [ chartResolution, setChartResolution ] = useState('week')

    useEffect(() => {
        let mounted = true
        setIsChartLoading(true)

        if(!symbol) return
        
        fetchCryptoLineData(symbol, chartResolution, token)
        .then(result => {
            if(!mounted) return
            setChartData(result.data)
            setLabelData(graphLabelDataHandler(result.date))
            setIsChartLoading(false)
        })
        .catch (
            err => console.error(err)
        )

        return () => mounted = false

    }, [symbol, token, chartResolution])


    const graphDataProps = {
            labels: labelData,
            datasets: [
                {
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
        <>
            <ResolutionButtonContainer>
                <ResolutionButton active={chartResolution === 'day' ? true : false} value={'day'} onClick={buttonHandler}>DAY</ResolutionButton>
                <ResolutionButton active={chartResolution === 'week' ? true : false} value={'week'} onClick={buttonHandler}>WEEK</ResolutionButton>
                <ResolutionButton active={chartResolution === 'month' ? true : false} value={'month'} onClick={buttonHandler}>MONTH</ResolutionButton>
                <ResolutionButton active={chartResolution === 'year' ? true : false} value={'year'} onClick={buttonHandler}>YEAR</ResolutionButton>
            </ResolutionButtonContainer>
            <GraphContainer>
                {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps} />}
            </GraphContainer>
        </>
    )
}