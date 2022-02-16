import styled from 'styled-components'

export const StyledHeader = styled.header`
    
    `

export const Nav = styled.nav`
    display: flex;
    align-items: center;
    border-bottom: 1.5px solid black;

    > * {
        &:first-child {
            margin-left: 0;
        }
    }
`
export const NavButton = styled.button`
    cursor: pointer;
    margin: 10px 10px 0 10px;
    padding-bottom: 11px;
    font-size: .75rem;
    font-weight: bold;
    letter-spacing: .1rem;
    text-transform: bold;
    border: none;
    background: none;
    position: relative;
    @media (max-width: 768px) {
        margin: 10px 2px 0 2px;
    }

    &:after{
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleY(0);
        height: 3px;
        bottom: -3px;
        left: 0;
        background-color: black;
        transform-origin: bottom;
    }
    &:hover:after{
        transform: scaleY(1);
        transform-origin: bottom;
    }
    ${({ active }) => active && `
        &:after {
        content: '';
        position: absolute;
        width: 100%;
        transform: scaleY(1);
        height: 3px;
        bottom: -3px;
        left: 0;
        background-color: black;
        transform-origin: bottom;
        }
        cursor: default;
    `}
    `

//Change to image when created
export const Logo = styled.div`
    // Temporary style
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: .1rem;
    text-transform: bold;
    display: flex;
    justify-content: center;
    flex-grow: 1;
`
export const NavIcon = styled.img`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-items: center;
    height: 1.75rem;
    width: 1.75rem;
    border-radius: 50%;
    background-color: white;
    padding: 7px;
    border: .5px solid black;
    &:hover {
        background-color: #f5f5f5;
    }
`