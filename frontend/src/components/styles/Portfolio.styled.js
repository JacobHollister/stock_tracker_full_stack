import styled from "styled-components";

export const PortfolioContainer = styled.div`
    margin: 0 0 5rem 0;
    padding: 0 .5rem 3rem .5rem;
    display: grid;
    gap: 1rem;
    @media (max-width: 767px) {
        padding: 0 0 3rem 0;
    }
`

export const PortfolioHeader = styled.div`
    padding: 0 .5rem;
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
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1.5fr 1fr;
    gap: .5rem;
    @media (max-width: 992px) {

    }
    @media (max-width: 767px) {
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
    @media (max-width: 576px) {

    }
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
    @media (max-width: 992px) {
        grid-template-columns: repeat(2, auto);
    
    }
    @media (max-width: 768px) {
    }
    @media (max-width: 576px) {
        justify-content: center;
        grid-template-columns: auto;
    }
`
export const PortfolioWeightingsContainer = styled.div`
    margin: 2rem 1rem;
    margin-top: 1rem;
`
export const PortfolioInfoDetail = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-content: center;
    grid-template-columns: auto auto 1fr;
    gap: 0 .5rem;
    font-size: .9rem;
    @media (max-width: 576px) {
        grid-template-columns: 1fr auto 1fr;
    }
`
export const PortfolioInfoLabel = styled.div`
    font-weight: 600;
`
export const PortfolioHoldingsContainer = styled.div`
    height: 30rem;
`
export const TradeDetailsHeader = styled.div`
    display: grid;
    grid-template-columns: .75fr 1fr 1fr .75fr;
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
    grid-template-columns: .75fr 1fr 1fr .75fr;
    align-items: center;
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
    @media (max-width: 767px){
        margin: 0;
    }
    @media (max-width: 767px){
        text-align: center;
    }
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
