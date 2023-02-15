import { Link } from "react-router-dom"
import logo from "../../assets/img/logo.svg"
import { Advices, AdvicesContent, Container, IconsContainer, IconsOrganizer, Logo, UserArea, UserForms } from "./styles"

export const Login = () => {
    return (
        <Container>
            <UserArea>    
                <Logo src={logo} alt="" />
                <p>Faça o Login para poder comprar e baixar livros, avaliar, e muito mais!</p>
                <UserForms>
                    <input type="text"/>
                    <input type="text"/>
                    <button type="submit">Login</button>
                </UserForms>
                <span>
                    Não tem uma conta?
                    <Link to="/register">Cadastre-se Agora</Link>
                </span>
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