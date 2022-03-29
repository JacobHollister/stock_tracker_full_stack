import styled from 'styled-components';

export const CardOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    padding: .5rem;
    z-index: 100;
    background-color: rgba(255,255,255,.75);
    display: grid;
    grid-template-columns: auto auto;
    align-content: center;
    justify-content: center;
`

export const CryptoContainer = styled.div`
    position: relative;
    display: grid;
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
`

export const CryptoHeading = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;
    display: grid;
    grid-template-columns: auto auto;
    justify-content:space-between;
    h1 {
        grid-column-start: 1;
        grid-column-end: 3;
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
    @media (max-width: 767px){
        grid-template-columns: 1fr;
        margin-left:.5rem;
        h1 {
            grid-column-start: 1;
            grid-column-end: 2;
        }
        button {
            justify-self: start;
            margin-left: 0;
        }
    }

`