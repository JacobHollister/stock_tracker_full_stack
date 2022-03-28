import styled from 'styled-components';

export const Hamburger = styled.div`
    position: absolute;
    width: 3rem;
    height: 3rem;
    padding: .5rem;
    margin-left: .5rem;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    z-index: 10;
    & > div {
        width: 100%;
        height: .35rem;
        border-radius: 10px;
        background-color: ${props => props.theme.primary};
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