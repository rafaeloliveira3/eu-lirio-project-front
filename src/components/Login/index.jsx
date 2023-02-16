import { Link } from "react-router-dom"
import logo from "../../assets/img/logo.svg"
import { Advices, AdvicesContent, Container, IconsContainer, IconsOrganizer, Logo, RegisterContainer, UserArea, UserForms } from "./styles"

export const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <UserArea>    
                <Logo src={logo} alt="" />
                <p>Faça o Login para poder comprar e baixar livros, avaliar, e muito mais!</p>
                <UserForms>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Senha"/>
                    <button type="submit" onClick={handleLogin}>Login</button>
                </UserForms>
                <RegisterContainer>
                    Não tem uma conta?
                    <Link to="/register/step1">Cadastre-se Agora</Link>
                </RegisterContainer>
            </UserArea>
            <Advices>
                <AdvicesContent>
                    <IconsOrganizer>
                        <IconsContainer>
                            <i className="fas fa-book-open"></i>
                        </IconsContainer>
                        <IconsContainer>
                            <i className="fas fa-pencil-alt"></i>
                        </IconsContainer>
                    </IconsOrganizer>
                    <p>
                        Uma plataforma de apoio a literatura
                    </p>
                    <span>
                        Cadastre-se!
                    </span>
                </AdvicesContent>
            </Advices>
        </Container>
    )
}