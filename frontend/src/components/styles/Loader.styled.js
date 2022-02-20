import styled, { keyframes } from 'styled-components';
const loadingAnimation = keyframes`
    0% {
        top: 8px;
        height: 64px;
    }
    50%, 100% {
        top: 24px;
        height: 32px;
    }
`
export const LoaderContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoaderBars = styled.div`
    display: inline-block;
    position: relative;
    width: 40px;
    height: 80px;

    > * {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 8px;
        background: #454545;
        animation: ${loadingAnimation} 1.5s cubic-bezier(0, 0.5, 0.5, 1) infinite;

            &:nth-child(1) {
                left: 0px;
                animation-delay: -0.5s;
            }
        
            &:nth-child(2) {
                left: 16px;
                animation-delay: -0.25s;
            }
        
            &:nth-child(3) {
                left: 32px;
                animation-delay: 0;
            }
    }

`
