import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { Form } from "../../utils/register"
import { TosContainer } from "./styles"

export const Step2 = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    
    const [fullName, setFullName] = useState('')
    const [birth, setBirth] = useState('')

    const [accepted, setAccepted] = useState(false)
    
    const [data, setData] = useState({})

    const step1Result = location.state.user

    const canSubmit = () => {
        if (accepted) document.querySelector('#submit').removeAttribute('disabled')
        else document.querySelector('#submit').setAttribute('disabled', true)
    }
    
    useEffect(() => canSubmit())
    
    const handleStep2 = (e) => {
        e.preventDefault()

        let username = step1Result.username
        let email = step1Result.email
        let password = step1Result.password


        setUser({
            user_name: username,
            email: email,
            senha: password,
            nome: fullName,
            data_nascimento: birth
        })

        console.log(user);
        fetch(`${defaultUrl}user`, {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body : JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => setData(data))

        

        // navigate('/register/step3', {
        //     state: {
        //         user : user
        //     }
        // })
    }
    
    
    return (
        <Form onSubmit={handleStep2}>
            <input 
                type="text" 
                placeholder="Nome Completo"
                value={fullName}
                onChange={(e) => {setFullName(e.currentTarget.value)}}
                required
            />
            <input 
                type="date"
                value={birth}
                onChange={(e) => {setBirth(e.currentTarget.value)}}
                required
            />
            <TosContainer>
                <p>Li e concordo com todos os <Link>Termos de Uso</Link></p>
                <input type="checkbox" onClick={(e) => {setAccepted(e.currentTarget.checked)}}/>
            </TosContainer>
            <button type="submit" id="submit">Avançar</button>
        </Form>
    )
}