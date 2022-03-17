import { useEffect, useState } from 'react';
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
import Loader from './Loader'

ChartJS.register(
    ArcElement,
    DoughnutController,
    PieController,
    CategoryScale,
    Legend,
    Title,
    Tooltip,
); 

function PortfolioDoughnutGraph({data, tradedCompanies}) {

    const [ isChartLoading, setIsChartLoading] = useState(true)
    const [ chartData, setChartData ] = useState(null)
    const [ labelData, setLabelData ] = useState(null)

    useEffect(() => {
        setIsChartLoading(true)
        if(Object.keys(data).length > 0 && Object.keys(tradedCompanies).length > 0){
            doughnutGraphHandler(data, tradedCompanies)
            setIsChartLoading(false)
        }
    },[data, tradedCompanies])

    const doughnutGraphHandler = (data, tradedCompanies) => {
        let labels = []
        let graphData = []
        Object.keys(data).forEach((company) => {
            labels.push(company)
            const graphDataAmount = (tradedCompanies[company] * data[company].data[data[company].data.length -1]).toFixed(2)
            graphData.push(parseFloat(graphDataAmount))
        })

        if(graphData.length > 4){
            const sortedGraphData = [...graphData].sort().reverse().slice(0,3)
            const updatedGraphData = [0]
            const updatedLabelData = ['Other']
            labels.forEach((company, ind) => {
                if(sortedGraphData.includes(graphData[ind]))
                {
                    updatedGraphData.push(parseFloat(graphData[ind]))
                    updatedLabelData.push(company)
                } else {
                    updatedGraphData[0] = graphData[ind] + parseFloat(updatedGraphData[0])
                }
            })
            updatedGraphData.reverse()
            updatedLabelData.reverse()
            setChartData(updatedGraphData)
            setLabelData(updatedLabelData)
            return
        }
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

        // These labels appear in the legend and in the tooltips when hovering different arcs
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

export default PortfolioDoughnutGraph;