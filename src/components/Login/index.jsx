import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.svg"
import { defaultUrl } from "../helpers/url"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Advices, AdvicesContent, Container, IconsContainer, IconsOrganizer, Logo, RegisterContainer, UserArea, UserForms } from "./styles"

export const Login = () => {
    
    const navigate = useNavigate()
    const loginFailed = () => toast.error('Usuário e/ou Senha Incorretos!')
    const bdError = () => toast.warning('A Conexão com o Servidor Falhou. Tente Novamente Mais Tarde')
        
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [data, setData] = useState({})


    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            user_name : username,
            senha : password
        }

        fetch(`${defaultUrl}user/login`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body : JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch((e) => bdError())

        if (data) {
            if (data.token && data.id) {
                localStorage.setItem('id', data.id)
                localStorage.setItem('token', data.token)
                navigate('/app')
                console.log(data);
            }
            else {
                loginFailed()
            }
        }


    }

    return (
        <Container>
            <UserArea>    
                <Logo src={logo} alt="" />
                <p>Faça o Login para poder comprar e baixar livros, avaliar, e muito mais!</p>
                <UserForms onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={username}
                        onChange={(e) => {setUsername(e.currentTarget.value)}}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => {setPassword(e.currentTarget.value)}}
                        required
                    />
                    <button type="submit">Login</button>
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
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={8000} />
        </Container>
    )
}