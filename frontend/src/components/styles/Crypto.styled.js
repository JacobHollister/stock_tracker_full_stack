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
    display: grid;
    margin: 0 .5rem 3rem .5rem;
    h1 {
        font-size: 1.3rem;
        margin: 30px 0 5px 0;
    }
    @media (max-width: 767px) {
        gap: .5rem;
    }
`

export const CryptoHeading = styled.div`
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