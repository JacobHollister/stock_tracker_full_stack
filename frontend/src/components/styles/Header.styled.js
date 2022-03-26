import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledHeader = styled.header`
    margin-bottom: 10px;
    `

export const AuthButton = styled.button`
    cursor: pointer;
    margin: 0 .5rem;
    padding: 5px;
    font-weight: bold;
    display: grid;
    grid-auto-flow: column;
    gap: 5px;
    align-items: center;
    background: none;
    background-color: ${props => props.alt ? 'grey' : 'none'};
    color: ${props => props.alt ? 'white' : 'black'};
    border: 1.5px solid black;
    border-radius: .25rem;

    &:last-child{
        margin-right: 0;
    }

    &:hover {
        background-color: lightgrey;
        color: ${props => !props.alt ? 'white' : 'black'};
    }
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

    @media (max-width: 767px) {
        display: none;
    }
    @media (max-width: 576px) {
        display: none;
    }
`
// (<= 575px, 576px to 767px, 768px to 991px, > 992px )

export const NavButton = styled(NavLink)`
        cursor: pointer;
        text-decoration: none;
        color: black;
        margin: 10px 10px 0 10px;
        padding-bottom: 11px;
        font-size: .75rem;
        font-weight: bold;
        text-transform: bold;
        border: none;
        background: none;
        position: relative;

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
        
        &.active {
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
        }
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
    margin-left: .5rem;
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

export const Backdrop = styled.div`
    position: fixed;
    height: calc(100% - 2rem);
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
    @media (min-width: 768px) {
        display: none;
    }
`

export const SideNav = styled.nav`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: calc(100% - 2rem);
    left: 0;
    bottom: 0;
    z-index: 1001;
    background-color: white;
    padding: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    transform: ${props => (props.display === 'true')? 'translateX(0)' : 'translateX(-100%)'};
    @media (min-width: 768px) {
        display: none;
    }
`
export const NavItems = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: right;
    height: 100%;
    justify-content: start;
`
export const SideNavButton = styled(NavLink)`
    padding: 1rem;
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
    font-weight: bold;

    &:last-child {
        margin-bottom: 2rem;
    }
`

export const NavLogo = styled.div`
    font-weight: bold;
    // Temporary style
    font-size: 2rem;
    letter-spacing: .1rem;
    text-transform: bold;
    padding: 1rem;
`

export const NavSmall = styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 2rem;
    background-color: white;
    display: flex;
    align-items: center;
    border-bottom: 1.5px solid black;
    z-index: 900;
    margin-bottom: 1rem;
    > * {
        &:first-child {
            margin-left: 0;
        }
    }

    @media (min-width: 768px) {
        display: none;
    }
`