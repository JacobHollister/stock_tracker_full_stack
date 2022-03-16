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
  PortfolioHoldingsContainer,
  PortfolioInfoContainer
} from '../components/styles/Portfolio.styled'
import { InfoDetail, InfoLabel } from '../components/styles/Company.styled'
import PortfolioGraph from '../components/PortfolioGraph'
import { ResolutionButtonContainer, ResolutionButton } from '../components/styles/CompanyGraph.styled'
import PortfolioDoughnutGraph from '../components/PortfolioDoughnutGraph'
import PortfolioHolding from '../components/PortfolioHolding'


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

  const [ chartColor, setChartColor ] = useState(null)
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
    //console.log(tradedCompanyLineData, portfolioData)
  }, [tradedCompanies, tradedCompanyLineData, trades, portfolioData])

  const quoteChangeHandler = () => {
    const changeDirection = ( portfolioData.close > portfolioData.open ) ? '+' : "-"
    const change = portfolioData.close - portfolioData.open
    const changeAmount = Math.abs(change.toFixed(2))
    const changePercentage = Math.abs(((change / portfolioData.open) * 100).toFixed(2))
    return `${changeDirection}$${changeAmount} (${changeDirection}${changePercentage}%) ${chartResolution}` 
  }

  useEffect(() => {
    const dangerFill = '#d9534f';
    const successFill =  '#5cb85c'; 

    if (portfolioData.close < portfolioData.open){
        setChartColor(dangerFill)
    } else if (portfolioData.close > portfolioData.open) {
        setChartColor(successFill)
    }
  }, [portfolioData])

  const resolutionChangeHandler = (e) => {
    setChartResolution(e.target.value)
  }

  const investmentGainHandler = () => {
    const changeDirection = ( portfolioData.close > portfolioData.investmentCost ) ? '+' : "-"
    return `${changeDirection}$${(portfolioData.close - portfolioData.investmentCost).toFixed(2)}`
  }

  const investmentPercentHandler = () => {
    const changeDirection = ( portfolioData.close > portfolioData.investmentCost ) ? '+' : "-"
    const change = portfolioData.close - portfolioData.investmentCost
    const changeAmount = Math.abs(change.toFixed(2))
    const changePercentage = Math.abs(((changeAmount / portfolioData.investmentCost) * 100).toFixed(2))
    return `${changeDirection}${changePercentage}%`
  }

  const investmentColorHandler = () => {
    const dangerFill = '#d9534f';
    const successFill =  '#5cb85c'; 
    return (portfolioData.close > portfolioData.investmentCost ) ? successFill : dangerFill
  }

  const companyHoldingTradeHandler = (company) => {
    const companyTrades = trades.filter((trade) => {
      return trade.ticker === company 
    })
    return companyTrades
  }
  
  if(isLoading || !isSuccess) return <Loader/>

  let holdings = Object.keys(tradedCompanies).map((company, ind) => {
    return (
      <PortfolioHolding 
        key={ind} 
        company={company} 
        trades={companyHoldingTradeHandler(company)}
        companyData={tradedCompanyLineData[company]}
      />
    )
  }).sort((company, nextCompany) => {
    let CompanyInvestment = 0
    let nextCompanyInvestment = 0
    company.props.trades.forEach((trade) => {
      CompanyInvestment += trade.quantity * trade.purchase_price
    })
    nextCompany.props.trades.forEach((trade) => {
      nextCompanyInvestment += trade.quantity * trade.purchase_price
    })
    return CompanyInvestment > nextCompanyInvestment ? -1 : 1
  })
  
  return (
    <div>
      <StyledHeading>
        <h1>
          Portfolio
        </h1>
      </StyledHeading>
      <PortfolioContainer>
        <PortfolioHeader color={chartColor}>
          {/* Current amount, gain/resolution, percentage gain */}
          <h1>
            ${portfolioData.close !== 0 ? portfolioData.close : '0.0'}
          </h1>
          <h3>
            {portfolioData.close !== 0 ? quoteChangeHandler() : '0.0'}
          </h3>
        </PortfolioHeader>
        <PortfolioInfoContainer>
          <PortfolioGraphContainer>
            <ResolutionButtonContainer>
                <ResolutionButton active={chartResolution === 'day' ? true : false} value={'day'} onClick={resolutionChangeHandler}>DAY</ResolutionButton>
                <ResolutionButton active={chartResolution === 'week' ? true : false} value={'week'} onClick={resolutionChangeHandler}>WEEK</ResolutionButton>
                <ResolutionButton active={chartResolution === 'month' ? true : false} value={'month'} onClick={resolutionChangeHandler}>MONTH</ResolutionButton>
                <ResolutionButton active={chartResolution === 'year' ? true : false} value={'year'} onClick={resolutionChangeHandler}>YEAR</ResolutionButton>
            </ResolutionButtonContainer>
            <PortfolioGraph 
              data={tradedCompanyLineData} 
              resolution={chartResolution} 
              chartColor={chartColor}
              trades={trades}
              setResolution={(resolution) => resolutionChangeHandler(resolution)}/>
          </PortfolioGraphContainer>
          <div>
            {/* investment cost, total gain/loss amount, total gain percentage */}
            <h2>Overview</h2>
            <div>
                <InfoDetail>
                    <InfoLabel>Open :</InfoLabel>
                    <span>${portfolioData.open ? portfolioData.open : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Close :</InfoLabel>
                    <span>${portfolioData.close ? portfolioData.close : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Total Gain / Loss :</InfoLabel>
                    <span style={{color: investmentColorHandler()}}>{(portfolioData.investmentCost && portfolioData.close) ? investmentGainHandler() : '0.0'}</span>
                </InfoDetail>
                <InfoDetail >
                    <InfoLabel>Total Gain / Loss % :</InfoLabel>
                    <span style={{color: investmentColorHandler()}}>{(portfolioData.investmentCost && portfolioData.close) ? investmentPercentHandler() : '0.0'}</span>
                </InfoDetail>
                <InfoDetail>
                    <InfoLabel>Investment Cost :</InfoLabel>
                    <span>${portfolioData.investmentCost ? portfolioData.investmentCost : '0.0'}</span>
                </InfoDetail>
            </div>
          </div>
        </PortfolioInfoContainer>
        <PortfolioWeightingsContainer>
          <div>
            <PortfolioDoughnutGraph data={tradedCompanyLineData} tradedCompanies={tradedCompanies}/>
          </div>
          <div>
            sector wieghtings graph
          </div>
          <div>
            currency conversion
          </div>
        </PortfolioWeightingsContainer>
        <StyledHeading>
        <h1>
          Holdings
        </h1>
      </StyledHeading>
        <PortfolioHoldingsContainer>
          {holdings}
        </PortfolioHoldingsContainer>
      </PortfolioContainer>
    </div>
  )
}


// 1. Fetch portfolio information on all trades => redux (state.portfolio) -
// 2. Fetch line data on all companies -
// 3. Functions to correct all data for line graph -
// 4. Display info on portfolio in header and details section
// 5. display graph with day chart
// 6. display pie graph with current stocks
// 7. display individual stock card down below
  // stock cards - fetch quote
  // display ticker and quote infomation
  // drop down to display trades with add trade button and edit/remove options

// currency converion button
  


export default Portfolio