// Package imports
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Redux imports
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { reset as resetPortfolio } from '../../features/portfolio/portfolioSlice'

// Components
import MenuHamburger from './MenuHambuger'

// Styled Components
import { 
    NavHeader,
    Nav, 
    NavButton, 
    StyledHeader, 
    Logo, 
    NavIcon, 
    AuthButton,
    SideNav,
    NavItems,
    Backdrop,
    SideNavButton,
    NavLogo,
    NavSmall
} from '../styles/Header.styled'
import { Container } from '../styles/Container.styled'

// Assets / Icons
import ProfileIcon from '../../assets/icons/user.svg'
import { FaRegUser } from 'react-icons/fa'
import { FiLogIn, FiLogOut } from 'react-icons/fi'


export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    const onLogout = () => {
        setSideNavOpen("false")
        dispatch(logout())
        dispatch(resetPortfolio())
        dispatch(reset())
        navigate('/')
    }

    const [ sideNavOpen, setSideNavOpen ] = useState('false')

    const ToggleMenu = () => {
        setSideNavOpen(prev => prev === "true" ? 'false' : "true")
    }

    console.log(user)

    return(
        <StyledHeader>
            <Container>
                <NavHeader>
                    <h2>STOCK TRACKER</h2> 
                </NavHeader>
                <Nav>
                    <NavButton to="/">MARKETS</NavButton>
                    <NavButton to="/portfolio">PORTFOLIO</NavButton>
                    <NavButton to="/watchlist">WATCHLIST</NavButton>
                    <NavButton to="/crypto">CRYPTO</NavButton>
                    <NavButton to="/search">SEARCH</NavButton>
                    { user ? (
                        <div>
                            <span><strong>{user.name}</strong></span>
                            <AuthButton alt="true" onClick={onLogout}>
                                <FiLogOut/> Logout
                            </AuthButton>
                        </div>
                    ):(
                        <div>
                                <AuthButton onClick={() => navigate('/login')}>
                                    <FiLogIn/> Sign in
                                </AuthButton>
                                <AuthButton alt="true" onClick={() =>navigate('/register')}>
                                    <FaRegUser/> Register
                                </AuthButton>
                        </div>
                    )}
                </Nav>
                <NavSmall>
                    <MenuHamburger ToggleMenu={ToggleMenu} isOpen={sideNavOpen}/>
                    <Logo>STOCK TRACKER</Logo>
                </NavSmall>
                <SideNav display={sideNavOpen}>
                    <NavItems>
                        <NavLogo>STOCKS</NavLogo>
                        <SideNavButton to="/" onClick={() => setSideNavOpen("false")}>MARKETS</SideNavButton>
                        <SideNavButton to="/portfolio" onClick={() => setSideNavOpen("false")}>PORTFOLIO</SideNavButton>
                        <SideNavButton to="/watchlist" onClick={() => setSideNavOpen("false")}>WATCHLIST</SideNavButton>
                        <SideNavButton to="/crypto" onClick={() => setSideNavOpen("false")}>CRYPTO</SideNavButton>
                        <SideNavButton end to="/search" onClick={() => setSideNavOpen("false")}>SEARCH</SideNavButton>
                        { user ? (
                            <SideNavButton to='/' onClick={() => onLogout()}>LOGOUT</SideNavButton>
                            ):(
                            <>
                                <SideNavButton end to="/login" onClick={() => setSideNavOpen("false")}>LOGIN</SideNavButton>
                                <SideNavButton end to="/register" onClick={() => setSideNavOpen("false")}>REGISTER</SideNavButton>
                            </>
                        )}
                    </NavItems>
                </SideNav>
                {(sideNavOpen === 'true')? <Backdrop onClick={() => setSideNavOpen('false')}/> : null}
            </Container>
        </StyledHeader>
    )
}