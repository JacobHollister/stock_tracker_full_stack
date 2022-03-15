import { useEffect, useState } from 'react';
import compareAsc from 'date-fns/compareAsc';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function PortfolioGraph({data, trades, setResolution, chartColor}) {


    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)
    const [ chartResolution, setChartResolution ] = useState('week')

    useEffect(() => {
        
        //eslint-disable-next-line
    }, [chartResolution])

    useEffect(() => {
        if(Object.keys(data).length > 0 && trades.length > 0){
            portfolioGraphHandler(data, trades)
            portfolioGraphLabelHandler(data)
            setIsChartLoading(false)
        }
    }, [data, trades])

    function portfolioGraphHandler(data, trades){
        let portfolioData = []

        Object.keys(data).forEach((company) => {

            const companyTrades = trades.filter((trade) => {
                return trade.ticker === company
            })

            data[company].date.forEach((date, ind) => {
                companyTrades.forEach((trade) => {
                    const tradeDate = date
                    const labelDate = new Date(trade.purchase_date)
                    if(compareAsc(tradeDate, labelDate)){
                        if ( !portfolioData[ind] ) { portfolioData[ind] = 0 }
                        const companyAmount = trade.quantity * data[company].data[ind]
                        const totalAmount = parseFloat(portfolioData[ind] + companyAmount)
                        portfolioData[ind] = totalAmount
                    }
                })
            })
        })
        setChartData(portfolioData)
    }

    const portfolioGraphLabelHandler = (data) => {
        const labels = data[Object.keys(data)[0]].labels
        setLabelData(labels)
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

    return (
    <>
        {isChartLoading ? <Loader/> :<Line data={graphDataProps} options={graphOptionsProps} />}
    </>
    )
}

export default PortfolioGraph;