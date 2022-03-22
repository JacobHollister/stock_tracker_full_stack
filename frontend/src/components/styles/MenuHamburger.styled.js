import styled from 'styled-components';

export const Hamburger = styled.div`
    width: 2rem;
    height: 2rem;
    padding: .25rem;
    margin-left: .5rem;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 10;
    & > div {
        width: 100%;
        height: .25rem;
        border-radius: 10px;
        background-color: black;
        transform-origin: 1px;
        transition: all 0.3s linear;
    }
`

export const Line1 = styled.div`
    transform: ${props => props.isOpen === 'true' ? 'rotate(45deg)' : 'rotate(0)'};
    `
export const Line2 = styled.div`
    transform: ${props => props.isOpen === 'true' ? 'translateX(-100%)' : 'translateX(0)'};
    opacity: ${props => props.isOpen === 'true' ? 0 : 1 };
`
export const Line3 = styled.div`
    transform: ${props => props.isOpen === 'true' ? 'rotate(-45deg)' : 'rotate(0)'};
`