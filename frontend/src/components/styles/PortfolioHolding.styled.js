import styled from 'styled-components';

export const PorfolioCompanyCard = styled.div`
    cursor: pointer;
    padding: .5rem 0;
    margin-bottom: .5rem;
    margin: .5rem .5rem 0 .5rem;
    position: relative;
    border-bottom: 1px solid grey;
    display: grid;
    gap: 1rem;
    grid-template-columns: 15rem 1fr 1fr;
    justify-content: space-between; 
    align-items: center;
    color: black;
    &:hover {
        background-color: #f3f3f3;
        font-size: 1.01rem;
    }
    h3 {
        margin: .5rem 0;
        padding: .5rem;
        display: grid;
        grid-template-columns: 1fr auto 2fr;
        grid-auto-flow: column;
        justify-content: space-between;
        justify-items: center;
        span {
            &:first-child{
                justify-self: start;
            }
        }
    }
    @media (max-width: 992px) {
    
    }
    @media (max-width: 767px) {
        margin: .5rem 0 0 0;
        grid-template-columns: 7rem 1fr 1fr;
        h3 {
            padding: .5rem 0;
            grid-template-columns: auto;
            grid-auto-flow: row;
            gap: 1rem;

            span { 
                &:nth-child(2){
                    display: none
                }
            }
        }
    }
    @media (max-width: 576px) {

    }

`
export const PorfolioCompanyCardInfo = styled.div`
    justify-self: center;
    display: grid;
    grid-auto-flow: row;
    gap: .2rem;
    div {
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between;
        gap: 1rem;
    }
    span {
        &:nth-child(2) {
            color: ${props => props.color ? props.color : 'black'};
            font-weight: bold;
        }
    }
    @media (max-width: 767px) {
        grid-template-rows: 1fr 1fr;
        gap: .75rem;
        span{
            text-align: center;
        }
        div {
            justify-content: center;
            grid-auto-flow: row;
            gap: .1rem;
        }
    }
`