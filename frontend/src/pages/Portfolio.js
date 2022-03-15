import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolio } from '../features/portfolio/portfolioSlice'
import { portfolioCloseHandler, portfolioOpenHandler, portfolioGraphDataHandler } from '../utils/PortfolioUtils'
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
    let totalInvestment = 0
    const tradedCompanies = {}
    trades.forEach(trade => {
      if(!tradedCompanies[trade.ticker]) {
        tradedCompanies[trade.ticker] = trade.quantity
      } else {
        tradedCompanies[trade.ticker] += trade.quantity
      }
      totalInvestment += trade.quantity * trade.purchase_price
    });
    setTradedCompanies(tradedCompanies)

    setPortfolioData( prev => {
      return { ...prev, investmentCost: totalInvestment}
    })
  }, [trades])

  const [ tradedCompanies, setTradedCompanies ] = useState({})
  const [ tradedCompanyLineData, setTradedCompanyLineData] = useState({})
  const [ chartResolution, setChartResolution ] = useState('week')
  const [ portfolioData, setPortfolioData] = useState({
    open: 0, 
    close: 0,
    investmentCost: 0
  })

  useEffect(() => {
    if (Object.keys(tradedCompanies).length === 0) return

    const companies = Object.keys(tradedCompanies)

    let companyFetchPromises = companies.map((company) => {
      return fetchLineData(company, chartResolution)
    })

    Promise.all(companyFetchPromises)
      .then( lineDataResponses => {
        
        const fetchedCompanyLineData = {} 

        lineDataResponses.forEach((response, ind) => {
          fetchedCompanyLineData[companies[ind]] = response
        })

        setTradedCompanyLineData(portfolioGraphDataHandler(fetchedCompanyLineData))

        const open = portfolioOpenHandler(fetchedCompanyLineData, tradedCompanies)
        const close = portfolioCloseHandler(fetchedCompanyLineData, tradedCompanies)

        setPortfolioData(prev => {
          return {...prev, open, close}
        })

      })
  }, [tradedCompanies, chartResolution])

  useEffect(() => {
    //console.log(tradedCompanies, tradedCompanyLineData, trades, portfolioData)
    console.log(tradedCompanyLineData, portfolioData)
  }, [tradedCompanies, tradedCompanyLineData, trades, portfolioData])

 

  const portfolioInvestmentHandler = (trades) => {
      let total = 0

      for (const company in trades) {
        const amount = tradedCompanies[company].quantity
        const price = tradedCompanies[company].purchase_price
        const totalPoistion = price * amount
        total += totalPoistion
      }

      return total.toFixed(2)
  }

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

// Header
  // Get Trades
  //


// 1. Fetch portfolio information on all trades => redux (state.portfolio)
// 2. Fetch line data on all companies
// 3. Functions to correct all data for line graph
// display graph with day chart
// display info on portfolio
// currency converion button or
// display pie graph with current stocks
// display individual stock card down below
  // stock cards - fetch quote
  // display ticker and quote infomation
  // drop down to display trades with add trade button and edit/remove options
  


export default Portfolio