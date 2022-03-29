// Package imports
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { getPortfolio } from '../features/portfolio/portfolioSlice'

// Helper functions
import { 
  portfolioCloseHandler, 
  portfolioOpenHandler, 
  portfolioGraphDataHandler 
} from '../utils/PortfolioUtils'
import { fetchLineData, fetchCryptoLineData } from '../utils/Api'

// Components
import Loader from '../components/sharedComponents/Loader'
import PortfolioGraph from '../components/portfolioPage/PortfolioGraph'
import PortfolioDoughnutGraph from '../components/portfolioPage/PortfolioDoughnutGraph'
import PortfolioHolding from '../components/portfolioPage/PortfolioHolding'

// Styled Components
import { StyledHeading } from '../components/styles/Heading.styled'
import { 
  PortfolioHeader, 
  PortfolioGraphContainer, 
  PortfolioWeightingsContainer,
  PortfolioHoldingsContainer,
  PortfolioInfoContainer,
  PortfolioOverviewContainer,
  PortfolioInfoLabel,
  PortfolioInfoDetail
} from '../components/styles/Portfolio.styled'
import { 
  ResolutionButtonContainer, 
  ResolutionButton 
} from '../components/styles/CompanyGraph.styled'


export default function Portfolio() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { trades, isLoading, isSuccess } = useSelector((state) => state.portfolio)

  useEffect(() => {
    if(!user){
      navigate('/login')
    } else {
      dispatch(getPortfolio())
    }
  }, [user, navigate, dispatch])

  useEffect(() => {
    if(Object.keys(trades).length === 0) return 
    let totalInvestment = 0
    const tradedCompanies = {}
    trades.stocks.forEach(trade => {
      if(!tradedCompanies[trade.ticker]) {
        tradedCompanies[trade.ticker] = trade.quantity
      } else {
        tradedCompanies[trade.ticker] += trade.quantity
      }
      totalInvestment += trade.quantity * trade.purchase_price
    });
    setTradedCompanies(tradedCompanies)
    
    const tradedCrypto = {}
    trades.crypto.forEach(trade => {
      if(!tradedCrypto[trade.symbol]) {
        tradedCrypto[trade.symbol] = trade.quantity
      } else {
        tradedCrypto[trade.symbol] += trade.quantity
      }
      totalInvestment += trade.quantity * trade.purchase_price
    });
    setTradedCrypto(tradedCrypto)

    setPortfolioData( prev => {
      return { ...prev, investmentCost: totalInvestment}
    })
  }, [trades])

  const [ chartColor, setChartColor ] = useState(null)
  const [ tradedCompanies, setTradedCompanies ] = useState({})
  const [ tradedCrypto, setTradedCrypto ] = useState({})
  const [ tradedCompanyLineData, setTradedCompanyLineData] = useState({})
  const [ tradedCryptoLineData, setTradedCryptoLineData] = useState({})
  const [ chartResolution, setChartResolution ] = useState('week')
  const [ portfolioData, setPortfolioData] = useState({
    openStock: 0, 
    closeStock: 0,
    openCrypto: 0, 
    closeCrypto: 0,
    investmentCost: 0
  })

  useEffect(() => {
    let isMounted = true

    if (Object.keys(tradedCompanies).length === 0 && Object.keys(tradedCrypto).length === 0) return

    const companies = Object.keys(tradedCompanies)
    
    const companyFetchPromises = companies.map((company) => {
      return fetchLineData(company, chartResolution)
    })
    
    const fetchedCompanyLineData = {} 
    Promise.all([...companyFetchPromises])
      .then( lineDataResponses => {
        if(!isMounted) return 
        

        lineDataResponses.forEach((response, ind) => {
          fetchedCompanyLineData[companies[ind]] = response
        })

        //console.log(fetchedCompanyLineData)

        //setTradedCompanyLineData(fetchedCompanyLineData)
        setTradedCompanyLineData(portfolioGraphDataHandler(fetchedCompanyLineData))
        
        const openStock = portfolioOpenHandler(fetchedCompanyLineData, tradedCompanies)
        const closeStock  = portfolioCloseHandler(fetchedCompanyLineData, tradedCompanies)

        setPortfolioData(prev => {
          return {...prev, openStock, closeStock}
        })

      })
      
      const cryptos = Object.keys(tradedCrypto)
  
      const cryptoFetchPromises = cryptos.map((crypto) => {
        return fetchCryptoLineData(crypto, chartResolution, user.token)
      })

    const fetchedCryptoLineData = {} 
    Promise.all([...cryptoFetchPromises])
      .then( lineDataResponses => {
        if(!isMounted) return 
        

        lineDataResponses.forEach((response, ind) => {
          fetchedCryptoLineData[cryptos[ind]] = response
        })

        //console.log(fetchedCryptoLineData)
        setTradedCryptoLineData(fetchedCryptoLineData)
        //setTradedCryptoLineData(portfolioGraphDataHandler(fetchedCompanyLineData))
        
        const openCrypto = portfolioOpenHandler(fetchedCryptoLineData, tradedCrypto)
        const closeCrypto = portfolioCloseHandler(fetchedCryptoLineData, tradedCrypto)
        
        setPortfolioData(prev => {
          return {...prev, openCrypto, closeCrypto}
        })

      })
      
      return () => isMounted = false
    }, [tradedCompanies, tradedCrypto, chartResolution, user])
    
  // useEffect(() => {
  //   ///console.log(portfolioGraphDataHandler({... tradedCryptoLineData, ...tradedCompanyLineData}))
  //   const combinedGraphData = portfolioGraphDataHandler({...tradedCryptoLineData, ...tradedCompanyLineData})
  //   //console.log(combinedGraphData)
  // }, [tradedCryptoLineData, tradedCompanyLineData])

  const quoteChangeHandler = () => {
    const open = (parseFloat(portfolioData.openCrypto) + parseFloat(portfolioData.openCrypto)).toFixed(2)
    const close = (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeCrypto)).toFixed(2)
    const changeDirection = ( close > open ) ? '+' : "-"
    const change = close - open
    const changeAmount = Math.abs(change.toFixed(2))
    const changePercentage = Math.abs(((change / open) * 100).toFixed(2))
    return `${changeDirection}$${changeAmount} (${changeDirection}${changePercentage}%) ${chartResolution}` 
  }

  useEffect(() => {
    const dangerFill = '#d9534f';
    const successFill =  '#5cb85c'; 

    const open = (parseFloat(portfolioData.openCrypto) + parseFloat(portfolioData.openCrypto)).toFixed(2)
    const close = (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeCrypto)).toFixed(2)

    if (close < open){
        setChartColor(dangerFill)
    } else {
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
    const companyTrades = trades.stocks.filter((trade) => {
      return trade.ticker === company 
    })
    return companyTrades
  }

  const cryptoHoldingTradeHandler = (symbol) => {
    const cryptoTrades = trades.crypto.filter((trade) => {
      return trade.symbol === symbol 
    })
    return cryptoTrades
  }
  
  if(isLoading || !isSuccess) return <Loader/>
  if(!isLoading && Object.keys(tradedCompanies).length === 0 && Object.keys(tradedCrypto).length === 0) return <p>Please add trades to view portfolio</p>

  let stockHoldings = Object.keys(tradedCompanies).map((company, ind) => {
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

  let cryptoHoldings = Object.keys(tradedCrypto).map((symbol, ind) => {
    return (
      <PortfolioHolding 
        key={ind} 
        company={symbol} 
        trades={cryptoHoldingTradeHandler(symbol)}
        companyData={tradedCryptoLineData[symbol]}
        crypto
      />
    )
  }).sort((symbol, nextSymbol) => {
    let CompanyInvestment = 0
    let nextCompanyInvestment = 0
    symbol.props.trades.forEach((trade) => {
      CompanyInvestment += trade.quantity * trade.purchase_price
    })
    nextSymbol.props.trades.forEach((trade) => {
      nextCompanyInvestment += trade.quantity * trade.purchase_price
    })
    return CompanyInvestment > nextCompanyInvestment ? -1 : 1
  })
  
  return (
    <>
        <StyledHeading>
          <h1>
            PORTFOLIO
          </h1>
        </StyledHeading>
        <PortfolioHeader color={chartColor}>
          <h1>
            ${((portfolioData.closeStock !== 0) || (portfolioData.closeCrypto !== 0)) ? (parseFloat(portfolioData.closeCrypto) + parseFloat(portfolioData.closeStock)).toFixed(2): '0.0'}
          </h1>
          <h3>
            {((portfolioData.closeStock !== 0) || (portfolioData.closeCrypto !== 0)) ? quoteChangeHandler() : '0.0'}
          </h3>
        </PortfolioHeader>
        <PortfolioInfoContainer>
          <div>
            <ResolutionButtonContainer>
                <ResolutionButton active={chartResolution === 'day' ? true : false} value={'day'} onClick={resolutionChangeHandler}>DAY</ResolutionButton>
                <ResolutionButton active={chartResolution === 'week' ? true : false} value={'week'} onClick={resolutionChangeHandler}>WEEK</ResolutionButton>
                <ResolutionButton active={chartResolution === 'month' ? true : false} value={'month'} onClick={resolutionChangeHandler}>MONTH</ResolutionButton>
                <ResolutionButton active={chartResolution === 'year' ? true : false} value={'year'} onClick={resolutionChangeHandler}>YEAR</ResolutionButton>
            </ResolutionButtonContainer>
            <PortfolioGraphContainer>
                <PortfolioGraph 
                  data={portfolioGraphDataHandler({...tradedCryptoLineData, ...tradedCompanyLineData})} 
                  chartColor={chartColor}
                  trades={[...trades.stocks, ...trades.crypto]}
                  chartResolution={chartResolution}/>
              </PortfolioGraphContainer>
          </div>
          <PortfolioWeightingsContainer>
            <PortfolioDoughnutGraph data={{...tradedCompanyLineData, ...tradedCryptoLineData}} tradedHoldings={{...tradedCompanies, ...tradedCrypto}}/>
          </PortfolioWeightingsContainer>
        </PortfolioInfoContainer>
        <StyledHeading>
          <h1>
            OVERVIEW
          </h1>
        </StyledHeading>
            <PortfolioOverviewContainer>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Open</PortfolioInfoLabel>
                    <span> : </span>
                    <span>${portfolioData.open ? portfolioData.open : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Close</PortfolioInfoLabel>
                    <span> : </span>
                    <span>${portfolioData.close ? portfolioData.close : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Total Gain / Loss</PortfolioInfoLabel>
                    <span> : </span>
                    <span style={{color: investmentColorHandler()}}>{(portfolioData.investmentCost && portfolioData.close) ? investmentGainHandler() : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail >
                    <PortfolioInfoLabel>Total Gain / Loss %</PortfolioInfoLabel>
                    <span> : </span>
                    <span style={{color: investmentColorHandler()}}>{(portfolioData.investmentCost && portfolioData.close) ? investmentPercentHandler() : '0.0'}</span>
                </PortfolioInfoDetail>
                <PortfolioInfoDetail>
                    <PortfolioInfoLabel>Investment Cost</PortfolioInfoLabel>
                    <span> : </span>
                    <span>${portfolioData.investmentCost ? portfolioData.investmentCost : '0.0'}</span>
                </PortfolioInfoDetail>
            </PortfolioOverviewContainer>
      <StyledHeading>
        <h1>
          STOCK HOLDINGS
        </h1>
      </StyledHeading>
        <PortfolioHoldingsContainer>
          {stockHoldings}
        </PortfolioHoldingsContainer>
      <StyledHeading>
        <h1>
          CRYPTO HOLDINGS
        </h1>
      </StyledHeading>
      <PortfolioHoldingsContainer>
        {cryptoHoldings}
      </PortfolioHoldingsContainer>
    </>
  )
}