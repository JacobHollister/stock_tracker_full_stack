import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolio } from '../features/portfolio/portfolioSlice'

import { fetchLineData } from '../utils/Api'
import Loader from '../components/Loader'
import { StyledHeading } from '../components/styles/Heading.styled'
import { 
  PortfolioContainer, 
  PortfolioHeader, 
  PortfolioGraphContainer, 
  PortfolioWeightingsContainer,
  PortfolioHoldingsContainer
} from '../components/styles/Portfolio.styled'
import { CompanyInfoDetail } from '../components/styles/Company.styled'

function Portfolio() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { trades, isLoading, isError, isSuccess, message  } = useSelector((state) => state.portfolio)

  useEffect(() => {
    if(!user){
      navigate('/login')
    } else {
      dispatch(getPortfolio())
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    const tradedCompanies = {}
    trades.forEach(trade => {
      if(!tradedCompanies[trade.ticker]) {
        tradedCompanies[trade.ticker] = trade.quantity
      }
    });
    setTradedCompanies(tradedCompanies)
  }, [trades])

  const [ tradedCompanies, setTradedCompanies ] = useState({})
  const [ tradedCompanyLineData, setTradedCompanyLineData] = useState({})
  const [ chartResolution, setChartResolution ] = useState('week')

  useEffect(() => {
    if (Object.keys(tradedCompanies).length > 0) {
      let tradedCompanyLineData = {}
      Object.keys(tradedCompanies).forEach((company) => {
        fetchLineData(company, chartResolution)
        .then(result => {
          tradedCompanyLineData[company] = result
          })
        }) 
        setTradedCompanyLineData(tradedCompanyLineData)
    }
  }, [tradedCompanies, chartResolution])

  useEffect(() => {
    console.log(tradedCompanies)
    console.log(tradedCompanyLineData)
  }, [tradedCompanies, tradedCompanyLineData])


  if(isLoading || !isSuccess) return <Loader/>

  return (
    <div>
      <StyledHeading>
        <h1>
          Portfolio
        </h1>
      </StyledHeading>
      <PortfolioContainer>
        <PortfolioHeader>
          Header
        </PortfolioHeader>
        <PortfolioGraphContainer>
          <div>
            graph
          </div>
          <div>
            details
          </div>
        </PortfolioGraphContainer>
        <PortfolioWeightingsContainer>
          <div>
            wieghtings pie
          </div>
          <div>
            sector wieghtings graph
          </div>
        </PortfolioWeightingsContainer>
        <PortfolioHoldingsContainer>
          Holdings
        </PortfolioHoldingsContainer>
      </PortfolioContainer>
    </div>
  )
}

// Fetch portfolio information on all trades
// portfolio cash information??
// Fetch line data on all companies
// functions to correct all data for line graph
// display graph with day chart
// display info on portfolio
// currency converion button or
// display pie graph with current stocks
// display individual stock card down below
  // stock cards - fetch quote
  // display ticker and quote infomation
  // drop down to display trades with add trade button and edit/remove options
  


export default Portfolio