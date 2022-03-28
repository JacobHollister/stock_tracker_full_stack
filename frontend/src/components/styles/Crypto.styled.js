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