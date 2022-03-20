import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
`
export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFF;
    padding: 1rem 2rem;
    z-index: 1000;
    min-width: 30rem;
    h2, p{
        text-align: center;
    }
    div {
        display: grid;
        grid-auto-flow: column;
    }
    button {
        justify-self: center;
    }
`