import styled from "styled-components";

export const PortfolioContainer = styled.div`
    width: 100;
    padding: 0 .5rem 3rem .5rem;
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
export const PortfolioOverviewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 0rem 2rem;
`
export const PortfolioWeightingsContainer = styled.div`
    padding: 1rem;
`
export const PortfolioInfoDetail = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-content: center;
    grid-template-columns: auto auto 1fr;
    gap: 0 .5rem;
    margin: .5rem 0;
    font-size: .9rem;
`
export const PortfolioInfoLabel = styled.div`
    font-weight: 600;
`
export const PortfolioHoldingsContainer = styled.div`
    width: 100;
    height: 30rem;
`
export const TradeDetailsHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: .5rem .5rem;
    color: grey;
    border-bottom: 1px solid lightgrey;
    span {
        &:nth-last-of-type(){
            border-bottom: 1px solid lightgrey;
        }
    }
`

export const TradeDetailsInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    margin: 0 .5rem;
    padding: .25rem .5rem;
    background-color: #f3f3f3;
    span{
        &:nth-child(4){
            justify-self: end;
        }
    }
`
export const TradeDetailsContainer = styled.div`
    border: 1px solid lightgrey;  
    border-top: none;
    margin: 0 .5rem;
    background-color: #f3f3f3;
`

export const ButtonSmall = styled.button`
    cursor: pointer;
    padding: .25rem .5rem;
    justify-self: end;
    align-self: end;
    margin: .5rem;
    background-color: #5cb85c;
    border: none;
    border-radius: .1rem;
    color: white;
    transition: .1s;
    &:hover {
        background-color: ${props => props.color == 'grey' ? 'lightgrey' : '#ff434f'};
    }
    background-color: ${props => props.color};
`
