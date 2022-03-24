import styled from "styled-components";

export const PortfolioContainer = styled.div`
    margin: 0 0;
    padding: 0 .5rem 3rem .5rem;
    display: grid;
    gap: 1rem;
`

export const PortfolioHeader = styled.div`
    width: calc(100vw - 2rem);
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
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 2fr 1fr;
    gap: .5rem;
    @media (max-width: 992px) {
        grid-template-columns: 2fr 1fr;
        grid-auto-flow: column;
    }
    @media (max-width: 768px) {
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
    @media (max-width: 576px) {

    }
`

export const PortfolioGraphContainer = styled.div`
    height: 300px;
    width: calc(100vw - 2rem);
    div { 
        padding: .5rem 0;
    }
`
export const PortfolioOverviewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 0rem 2rem;
    @media (max-width: 992px) {
    
    }
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, auto);
    }
    @media (max-width: 576px) {
        grid-template-columns: auto;
    }
`
export const PortfolioWeightingsContainer = styled.div`
    padding: 1rem;
    margin-top: 1rem;
    @media (max-width: 768px) {
        width: calc(100vw - 1rem);
    }
    @media (max-width: 576px) {

    }
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
    width: calc(100vw - 2rem);
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
        background-color: ${props => props.color === 'grey' ? 'lightgrey' : '#ff434f'};
    }
    background-color: ${props => props.color};
`
