import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.svg'
import { Button, Headers, LinksContainer, Logo } from './styles'

export const Header = () => {
    return (
        <Headers>
            <Logo src={logo} alt="" />
            <LinksContainer>
                <li><a href="#shorts">CONFIRA</a></li>
                <li><a href="#liked">MAIS CURTIDOS</a></li>
                <li><a href="#solded">MAIS VENDIDOS</a></li>
            </LinksContainer>
            <Link to="/login">
                <Button>
                    Inscreva-se
                </Button>
            </Link>
        </Headers>
    )
}