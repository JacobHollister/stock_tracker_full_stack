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
        }
    }
`