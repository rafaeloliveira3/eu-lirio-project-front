import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { registerUser, userLogin } from "../../helpers/firebase"
import { toast, ToastContainer } from 'react-toastify';
import { Form } from "../../utils/register"
import { PasswordContainer } from "./styles";
import axios from "axios";
import { defaultUrl } from "../../helpers/url";

export const Step1 = () => {
    const { setUrl } = useOutletContext()

    useEffect(() => {
        setUrl('/login')
    })

    const registerError = (error) => toast.error(`Um erro ocorreu: ${error}`)
    const usernameExists = () => toast.error(`Esse nome de usuário já está em uso!`, {
        autoClose : 2000
    })
    
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState("")

    const [inputType, setInputType] = useState("password") 
    const [iconName, setIconName] = useState("fa-solid fa-eye-slash") 


    const handleStep1 = async (e) => {
        e.preventDefault()
        
        const isValid = userName.trim().length && 
        email.trim().length && password.trim().length  && passwordConfirmed.trim().length && passwordConfirmed === password

        if (password.trim().length < 6) {
            registerError("A senha deve ter 6 ou mais dígitos!")
        }
        else if (passwordConfirmed !== password) {
            registerError("As senhas não coincidem")
        }
        

        if (isValid) {
            const verifyUsername = await axios.get(`${defaultUrl}verify-username/${userName}`)
            .catch(async (err) => {
                return err
            })
            if (verifyUsername.response?.status === 404) {
                const userFirebase = await registerUser(email, password)
                if (userFirebase.error === undefined) {
                    await userLogin(email, password)
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
            if (verifyUsername.data) {
                usernameExists()
            }
        }
    }

    return (
        <>
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
            <PasswordContainer>
                <input 
                    type={inputType}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => {setPassword(e.currentTarget.value)}}
                    required
                />
                <i className={iconName} onClick={(e) => {
                    if (iconName === "fa-solid fa-eye-slash") {
                        setIconName("fa-solid fa-eye")
                        setInputType("text") 
                    }
                    else {
                        setIconName("fa-solid fa-eye-slash")
                        setInputType("password") 
                    }
                }}></i>
            </PasswordContainer>
            <PasswordContainer>
                <input 
                    type={inputType}
                    placeholder="Confirmar Senha"
                    value={passwordConfirmed}
                    onChange={(e) => {setPasswordConfirmed(e.currentTarget.value)}}
                    required
                />
                <i className={iconName} onClick={(e) => {
                    if (iconName === "fa-solid fa-eye-slash") {
                        setIconName("fa-solid fa-eye")
                        setInputType("text") 
                    }
                    else {
                        setIconName("fa-solid fa-eye-slash")
                        setInputType("password") 
                    }
                }}></i>
            </PasswordContainer>
            <button type="submit">Avançar</button>
        </Form>
        <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false} />
        </>
    )
}