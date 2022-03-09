import styled from 'styled-components';

export const CompanyContainer = styled.div`
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    margin-bottom: 3rem;
    h1 {
        font-size: 1.3rem;
        margin: 30px 0 5px 0;
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
`

export const SuccessButton = styled.button`
    cursor: pointer;
    width: 10rem;
    height: 2rem;
    justify-self: end;
    align-self: end;
    margin: .5rem;
    background-color: #5cb85c;
    border: none;
    border-radius: .1rem;
    color: white;
    transition: .1s;
    &:hover {
        background-color: #28a745;
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
    margin-left: 1rem;
`
export const CompanyInfoDetail = styled.div`
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    margin: 1rem 0;
    font-size: .8rem;
`
export const InfoLabel = styled.span`
    font-weight: 600;
`