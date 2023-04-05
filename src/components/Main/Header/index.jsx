import { Link } from 'react-router-dom'
import logo from '../../../assets/img/logo.svg'
import { Button, Headers, LinksContainer, Logo } from './styles'

export const Header = () => {
    return (
        <Headers>
            <Logo src={logo} alt="" />
            <LinksContainer>
                <li>SUPORTE</li>
                <li>TERMOS DE USO</li>
                <li>SOBRE</li>
            </LinksContainer>
            <Link to="/login">
                <Button>
                    Inscreva-se
                </Button>
            </Link>
        </Headers>
    )
}