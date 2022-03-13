import styled from "styled-components";

export const PortfolioContainer = styled.div`
    width: 100;
    padding: .5rem;
    display: grid;
    gap: .5rem;
`

export const PortfolioHeader = styled.div`
    width: 100;
    border: 1px solid black;
    height: 3rem;
`
export const PortfolioGraphContainer = styled.div`
    width: 100;
    border: 1px solid black;
    height: 20rem;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr 1fr;
    gap: .5rem;
    div {
        border: 1px solid black;
        margin: .1rem;
        height: auto;
    }
`
export const PortfolioWeightingsContainer = styled.div`
    width: 100;
    border: 1px solid black;
    height: 15rem;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
    div {
        border: 1px solid black;
        margin: .1rem;
        height: auto;
    }
`
export const PortfolioHoldingsContainer = styled.div`
    width: 100;
    border: 1px solid black;
    height: 30rem;
`