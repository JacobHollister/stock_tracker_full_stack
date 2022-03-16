import { Nav, NavButton, StyledHeader, Logo, NavIcon, AuthButton } from './styles/Header.styled'
import { Container } from './styles/Container.styled'
import ProfileIcon from '../assets/icons/user.svg'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { reset as resetPortfolio } from '../features/portfolio/portfolioSlice'
import { useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { FiLogIn, FiLogOut } from 'react-icons/fi'


export default function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    const onLogout = () => {
        dispatch(logout())
        dispatch(resetPortfolio())
        dispatch(reset())
        navigate('/')
    }

    return(
        <StyledHeader>
            <Container>
                <Nav>
                    <NavButton to="/">MARKETS</NavButton>
                    <NavButton to="/portfolio">PORTFOLIO</NavButton>
                    <NavButton to="/watchlist">WATCHLIST</NavButton>
                    <NavButton to="/search">SEARCH</NavButton>
                    <Logo>STAKE</Logo>
                    { user ? (
                        <>
                            <AuthButton alt="true" onClick={onLogout}>
                                <FiLogOut/> Logout
                            </AuthButton>
                            <Link to='/'>
                                <NavIcon src = {ProfileIcon}></NavIcon>
                            </Link>
                        </>
                    ):(
                        <>
                                <AuthButton onClick={() => navigate('/login')}>
                                    <FiLogIn/> Sign in
                                </AuthButton>
                                <AuthButton alt="true" onClick={() =>navigate('/register')}>
                                    <FaRegUser/> Register
                                </AuthButton>
                        </>
                    )}
                </Nav>
            </Container>
        </StyledHeader>
    )
}