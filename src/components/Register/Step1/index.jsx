import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form } from "../../utils/register"

export const Step1 = () => {
    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState("")

    const handleStep1 = (e) => {
        e.preventDefault()
        
        const isValid = userName.trim().length && 
        email.trim().length && password.trim().length && passwordConfirmed.trim().length && passwordConfirmed === password

        if (isValid) {
            navigate('/register/step2', {
                state : {
                    user : {
                        username: userName, 
                        email: email, 
                        password: password
                    }
                }
            })
        }

    }

    return (
        <Form onSubmit={handleStep1}>
            <input 
                type="text" 
                placeholder="Nome de Usuário"
                value={userName}
                onChange={(e) => {setUserName(e.currentTarget.value)}}
                required
            />
            <input 
                type="email" 
                placeholder="E-mail"
                value={email}
                onChange={(e) => {setEmail(e.currentTarget.value)}}
                required
            />
            <input 
                type="password" 
                placeholder="Senha"
                value={password}
                onChange={(e) => {setPassword(e.currentTarget.value)}}
                required
            />
            <input 
                type="password" 
                placeholder="Confirmar Senha"
                value={passwordConfirmed}
                onChange={(e) => {setPasswordConfirmed(e.currentTarget.value)}}
                required
            />
            <button type="submit">Avançar</button>
        </Form>
    )
}