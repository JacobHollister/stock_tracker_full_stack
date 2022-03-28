// Components
import IndiceGraph from '../components/marketsPage/IndiceGraph'
import CryptoGraph from '../components/marketsPage/CryptoGraph'
import News from "../components/sharedComponents/News"

// Styled Components
import { StyledHeading } from "../components/styles/Heading.styled"
import { MarketGraphContainer } from "../components/styles/Markets.styled"


export default function Markets() {

  return (
    <>
      <StyledHeading>
        <h1>
          US MARKETS
        </h1>
      </StyledHeading>
      <MarketGraphContainer>
        <IndiceGraph ticker={"spy"} indice={'S&P500'}/>
        <IndiceGraph ticker={"qqq"} indice={'NASDAQ'}/>
        <IndiceGraph ticker={"iwm"} indice={'RUSSEL 2000'}/>
        <IndiceGraph ticker={"vxx"} indice={'VOLATILITY INDEX'}/>
      </MarketGraphContainer>
      <StyledHeading>
        <h1>
          CRYTPOCURRENCIES
        </h1>
      </StyledHeading>
      <MarketGraphContainer>
        <CryptoGraph symbol={"BTC"} name={'BITCOIN'}/>
        <CryptoGraph symbol={"ETH"} name={'ETHEREUM'}/>
      </MarketGraphContainer>
      <News/>
    </>
  )
}