import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, useOutletContext } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { Form } from "../../utils/register"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TosContainer, BDate, Label, CheckBox, CheckBoxContainer } from "./styles"
import axios from "axios";

export const Step2 = () => {
    const { setUrl } = useOutletContext()

    useEffect(() => {
        setUrl('/register/step1')
    })


    const location = useLocation()
    const navigate = useNavigate()

    const registerFailed = (err) => toast.error(`${err.response.data} - Erro: ${err.response.status}`)
    const bdError = () => toast.warning('A Conexão com o Servidor Falhou. Tente Novamente Mais Tarde')
    const onlyAdults = () => toast.warning('Apenas maiores de idade podem se Cadastrar! Redirecionando...')
    const registerSuccess = () => toast.success('Usuário Cadastrado! - Faça login para entrar em sua conta!')

    const [fullName, setFullName] = useState('')
    const [birth, setBirth] = useState('')
    const [tagEscritor, setTagEscritor] = useState(false)
    const [tagLeitor, setTagLeitor] = useState(false)

    const [tags, setTags] = useState([])
    const [fixedTags, setFixedTags] = useState([])

    const [accepted, setAccepted] = useState(false)

    let step1Result
    let username
    let email
    let password

    const canSubmit = () => {
        if (location.state != null) {
            if (accepted) document.querySelector('#submit').removeAttribute('disabled')
            else document.querySelector('#submit').setAttribute('disabled', true)
        }
    }
    const fixTags = () => {
        tags.map((item) => {
            setFixedTags(fixedTags => [...fixedTags, {id_tag: item}])
        })
    }

    useEffect(() => canSubmit())
    useEffect(() => fixTags(), [tags])

    const handleCheckboxes = (id) => {
        if (tags.indexOf(id) > -1) {
            setTags(tags => tags.filter((tag) => {
                return tag !== id
            }))
        }
        else {
            setTags(tags => [...tags, id])
        }
    }
    
    const handleStep2 = async (e) => {
        e.preventDefault()

        const date = new Date().getFullYear()
        const birthYear = birth.split('-')[0]

        let fixed = [...new Map(fixedTags.map(item => [item['id_tag'], item])).values()]

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
                data_nascimento: birth,
                tags : fixed,
                generos : [
                    {
                        id_genero: 1
                    }
                ]
            }

            const res = await axios.post(`${defaultUrl}user`, registered)
            .catch((err) => { 
                if (err.request.status === 400) {
                    registerFailed(err)
                }
                else {
                    bdError()
                }
                setTimeout(() => { navigate('/register/step1') }, 2500)
            })

            if (res.status === 201) {
                registerSuccess()
                setTimeout(() => { navigate('/login') }, 2500)
            }
            else {
                registerFailed()
                setTimeout(() => { navigate('/register/step1') }, 2500)
            }
        }
    }


    if (location.state != null) {
        step1Result = location.state.user
        username = step1Result.username
        email = step1Result.email
        password = step1Result.password
    }
    else {
        return <Navigate to='/register/step1' />
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
            <div>
                <CheckBoxContainer>
                    <div>
                        <CheckBox 
                            type="checkbox" 
                            name="escritor" 
                            id="1" 
                            checked={tagEscritor}
                            onChange={(e) => {setTagEscritor(!tagEscritor) ; handleCheckboxes(e.currentTarget.id)}}
                        />
                        <Label htmlFor="1">Escritor <div><i className="fa-solid fa-check"></i></div></Label>
                    </div>
                    <div>
                        <CheckBox 
                            type="checkbox" 
                            name="leitor" 
                            id="2" 
                            checked={tagLeitor}
                            onChange={(e) => {setTagLeitor(!tagLeitor) ; handleCheckboxes(e.currentTarget.id)}}
                        />
                        <Label htmlFor="2">Leitor <div><i className="fa-solid fa-check"></i></div></Label>
                    </div>
                </CheckBoxContainer>
            </div>
            <TosContainer>
                <p>Li e concordo com todos os <Link>Termos de Uso</Link></p>
                <input type="checkbox" onClick={(e) => {setAccepted(e.currentTarget.checked)}}/>
            </TosContainer>
            <button type="submit" id="submit">Salvar</button>
        </Form>
        <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false} />
        </>
    )
}