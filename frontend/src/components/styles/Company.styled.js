import styled from 'styled-components';

export const CompanyContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: 3rem;
    margin: 0 .5rem 3rem .5rem;
    h1 {
        font-size: 1.3rem;
        margin: 30px 0 5px 0;
    }
    @media (max-width: 767px) {
        gap: .5rem;
        margin: 0 0 3rem 0;
        padding: 0 .25rem;
    }
    `;

export const CompanyHeading = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content:space-between;
    div {
        flex: auto;
        display: flex;
        justify-content: end;
        padding-right: 1rem;
    }

    h2 {
        font-size: 1.3rem;
        font-weight: 300;
        margin: 5px 0;
        width: 100%;
        span {
            margin-right: 1rem;
            &:nth-child(2) {
                font-size: 1rem;
                font-weight: 600;
                color: ${props => props.color}
            }
        }
    }

    @media (max-width: 992px) {
    
    }
    @media (max-width: 767px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto 1fr;
        margin-left:.5rem;
        padding-right: 1rem;
        h1 {
            grid-column-start: 1;
            grid-column-end: span 2;
        }
        h2 {
            grid-column-start: 1;
            grid-column-end: span 2;
            grid-row-start: 2;
        }
        button{
            &:nth-child(2){
                grid-column-start: 2;
                justify-self: start;
                margin: 0;
            }
            &:nth-child(4){
                margin: 0;
                margin-top: 1rem;
                justify-self: start;
                grid-row-start: 3;
                grid-column-start: 1;
            }
        }
    }
    @media (max-width: 576px) {

    }
`

export const WatchlistButton = styled.button`
    cursor: pointer;
    justify-self: end;
    align-self: end;
    margin: .5rem;
    background-color: #eeeeee;
    border: none;
    border-radius: .1rem;
    transition: .1s;
    display: grid;
    grid-auto-flow: column;
    gap: 5px;
    &:hover {
        background-color: #dddddd;
    }
`

export const CompanyInfoContainer = styled.div`
    display: grid;
    align-content: center;
    margin: 0 .5rem;
    @media (max-width: 767px) {
        margin-top: 1rem;
    }
`

export const LabelContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem 4rem;
    padding: .5rem;
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        margin-top: 0;
        padding: 0;
    }
`

export const InfoDetail = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    margin: 0;
    font-size: .8rem;
`
export const InfoLabel = styled.span`
    font-weight: 600;

`