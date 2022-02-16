import { Nav, NavButton, StyledHeader, Logo, NavIcon } from './styles/Header.styled'
import { Container } from './styles/Container.styled'
import ProfileIcon from '../assets/icons/user.svg'

export default function Header() {
    return(
        <StyledHeader>
            <Container>
                <Nav>
                    <NavButton >PORTFOLIO</NavButton>
                    <NavButton active>WATCHLIST</NavButton>
                    <NavButton>MARKETS</NavButton>
                    <NavButton>SEARCH</NavButton>
                    <Logo>STAKE</Logo>
                    <NavIcon src = {ProfileIcon}></NavIcon>
                </Nav>
            </Container>
        </StyledHeader>
    )
}