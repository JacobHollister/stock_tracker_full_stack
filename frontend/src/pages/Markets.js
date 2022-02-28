import { StyledHeading } from "../components/styles/Heading.styled"
import { MarketGraphContainer } from "../components/styles/MarketGraphContainer.styled"
import IndiceGraph from '../components/IndiceGraph'
import News from "../components/News"

function Markets() {

  return (
    <>
      {/* US markets heading */}
      <StyledHeading>
        <h1>
          US MARKETS
        </h1>
      </StyledHeading>
      {/* US Markets (4 x indices graph components) */}
      <MarketGraphContainer>
        <IndiceGraph ticker={"spy"} indice={'S&P500'}/>
        <IndiceGraph ticker={"qqq"} indice={'NASDAQ'}/>
        <IndiceGraph ticker={"iwm"} indice={'RUSSEL 2000'}/>
        <IndiceGraph ticker={"vxx"} indice={'VOLATILITY INDEX'}/>
      </MarketGraphContainer>
      <News/>
    </>
  )
}

export default Markets