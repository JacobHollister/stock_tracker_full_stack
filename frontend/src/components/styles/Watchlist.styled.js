import styled from 'styled-components';

export const WatchlistCompanyCard = styled.div`
    cursor: pointer;
    margin-bottom: .5rem;
    margin: .5rem;
    position: relative;
    border-bottom: 1px solid grey;
    display: grid;
    gap: 1rem;
    grid-template-columns: 2fr 2fr 1fr;
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
    }
    
    h4 {
        color: ${props => props.color};
        margin: 0;
        display: grid;
        grid-auto-flow: column;
        justify-content: space-between; 
        padding: .5rem;
    }
    div {
        width: 10rem;
        height: 5rem;
        justify-self: center;
    }
`