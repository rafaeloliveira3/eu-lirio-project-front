import { useNavigate } from "react-router-dom"
import { Form } from "../../utils/register"

export const Step1 = () => {
    const navigate = useNavigate()
    const handleStep1 = (e) => {
        e.preventDefault()
        navigate('/register/step2')
    }

    return (
        <Form>
            <input type="text" placeholder="Nome de Usuário"/>
            <input type="email" placeholder="E-mail"/>
            <input type="password" placeholder="Senha"/>
            <input type="password" placeholder="Confirmar Senha"/>
            <button type="submit" onClick={handleStep1}>Avançar</button>
        </Form>
    )
}