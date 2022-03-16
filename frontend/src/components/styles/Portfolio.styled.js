import styled from "styled-components";

export const PortfolioContainer = styled.div`
    width: 100;
    padding: 0 .5rem;
    display: grid;
    gap: .5rem;
`

export const PortfolioHeader = styled.div`
    width: 100;
    h1 {
        margin: 0 0 .5rem 0;
    }

    h3 {
        margin: 0 0 .5rem 0;
        color: ${props => props.color}
    }
`
export const PortfolioInfoContainer = styled.div`
    padding-top: .5rem;
    width: 100;
    height: 350px;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr 1fr;
    gap: .5rem;
`

export const PortfolioGraphContainer = styled.div`
    height: 300px;
    div { 
        padding: .5rem 0;
    }
`
export const PortfolioWeightingsContainer = styled.div`
    width: 100;
    height: 300px;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    gap: .5rem;
    div {
        margin: .1rem;
    }
`
export const PortfolioHoldingsContainer = styled.div`
    width: 100;
    height: 30rem;
`