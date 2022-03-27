import styled from 'styled-components';

export const GraphContainer = styled.div`
    height: 300px;
    margin-left: -30px;
`
export const ResolutionButtonContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 5rem);


    > * {
        &:first-child {
            margin-left: 0;
        }
    }
    @media (max-width: 992px) {
    
    }
    @media (max-width: 768px) {

    }
    @media (max-width: 576px) {
        margin-bottom: 1rem;
        grid-template-columns: repeat(4, 1fr);
    }
`

export const ResolutionButton = styled.button`
    cursor: pointer;
    border: none;
    background: none;
    font-weight: 600;
    position: relative;

    &:after{
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleY(0);
            height: 2px;
            bottom: -9px;
            left: 0;
            background-color: black;
            transform-origin: bottom;
        }
        &:hover:after{
            transform: scaleY(1);
            transform-origin: bottom;
        }
        
        ${props => props.active ?  
            `&:after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleY(1);
            height: 2px;
            bottom: -9px;
            left: 0;
            background-color: black;
            transform-origin: bottom;
            }
            cursor: default;`
        : null}
`
