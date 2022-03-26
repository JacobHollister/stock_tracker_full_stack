// Styled Components
import { Hamburger, Line1, Line2, Line3 } from "../styles/MenuHamburger.styled"

export default function MenuHamburger({isOpen, ToggleMenu}) {
    
    return (
        <Hamburger onClick={ToggleMenu}>
            <Line1 isOpen={isOpen}></Line1>
            <Line2 isOpen={isOpen}></Line2>
            <Line3 isOpen={isOpen}></Line3>
        </Hamburger>
    )
}