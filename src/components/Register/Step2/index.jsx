import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { Form } from "../../utils/register"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TosContainer, BDate } from "./styles"

export const Step2 = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const registerFailed = () => toast.error('Algo deu Errado - Tente Novamente Mais Tarde')
    const bdError = () => toast.warning('A Conexão com o Servidor Falhou. Tente Novamente Mais Tarde')
    const onlyAdults = () => toast.warning('Apenas maiores de idade podem se Cadastrar! Redirecionando...')
    const registerSuccess = () => toast.success('Usuário Cadastrado! - Faça login para entrar em sua conta!')

    const [fullName, setFullName] = useState('')
    const [birth, setBirth] = useState('')

    const [accepted, setAccepted] = useState(false)
    
    const [data, setData] = useState({})



    const step1Result = location.state.user
    let username = step1Result.username
    let email = step1Result.email
    let password = step1Result.password

    const canSubmit = () => {
        if (accepted) document.querySelector('#submit').removeAttribute('disabled')
        else document.querySelector('#submit').setAttribute('disabled', true)
    }
    
    useEffect(() => canSubmit())
    
    const handleStep2 = (e) => {
        e.preventDefault()
        const date = new Date().getFullYear()
        const birthYear = birth.split('-')[0]
        if (date - birthYear < 18) { 
            onlyAdults()
            setTimeout(() => { navigate('/') }, 2500)
        }
        else {
            const registered = {
                user_name: username,
                email: email,
                senha: password,
                nome: fullName,
                data_nascimento: birth
            }
    
            fetch(`${defaultUrl}user`, {
                method: "POST",
                headers: {'Content-type': 'application/json'},
                body : JSON.stringify(registered)
            })
            .then(response => response.json())
            .then(data => setData(data))
            .catch((e) => { bdError(); setTimeout(() => { navigate('/register/step1') }, 2500)})

            if (data) {
                registerSuccess()
                setTimeout(() => { navigate('/login') }, 2500)
            }
            else {
                registerFailed()
                setTimeout(() => { navigate('/register/step1') }, 2500)
            }
        }
    }
    

    return (
        <>
        <Form onSubmit={handleStep2}>
            <input 
                type="text" 
                placeholder="Nome Completo"
                value={fullName}
                onChange={(e) => {setFullName(e.currentTarget.value)}}
                required
            />
            <BDate>    
                <label htmlFor="birth_date">Data de Nascimento</label>
                <input 
                    type="date"
                    value={birth}
                    onChange={(e) => {setBirth(e.currentTarget.value)}}
                    required
                    id="birth_date"
                />
            </BDate>
            <TosContainer>
                <p>Li e concordo com todos os <Link>Termos de Uso</Link></p>
                <input type="checkbox" onClick={(e) => {setAccepted(e.currentTarget.checked)}}/>
            </TosContainer>
            <button type="submit" id="submit">Avançar</button>
        </Form>
        <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false} />
        </>
    )
}