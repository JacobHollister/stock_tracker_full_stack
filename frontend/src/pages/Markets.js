import { StyledHeading } from "../components/styles/Heading.styled"
import { MarketGraphContainer } from "../components/styles/MarketGraphContainer.styled"
import IndiceGraph from '../components/IndiceGraph'

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
        <IndiceGraph ticker={"spy"}/>
        <IndiceGraph ticker={"qqq"}/>
        <IndiceGraph ticker={"iwm"}/>
        <IndiceGraph ticker={"vxx"}/>
      </MarketGraphContainer>
      {/* General news */}
      <StyledHeading>
        <h1>
          news
        </h1>
      </StyledHeading>
    </>
  )
}

export default Markets