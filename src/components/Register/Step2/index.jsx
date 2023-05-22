import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, Navigate, useOutletContext } from "react-router-dom"
import { Form } from "../../utils/register"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TosContainer, BDate, Label, CheckBox, CheckBoxContainer } from "./styles"
import { currentUser, userDelete } from "../../helpers/firebase";
import { MESSAGE_ERROR } from "../../helpers/toasts";

export const Step2 = () => {
    const { setUrl } = useOutletContext()

    useEffect(() => {
        setUrl('/register/step1')
    })


    const location = useLocation()
    const navigate = useNavigate()

    const [fullName, setFullName] = useState('')
    const [birth, setBirth] = useState('')

    const [tags, setTags] = useState([])

    const [accepted, setAccepted] = useState(false)

    const step1result = location?.state?.user

    const canSubmit = () => {
        if (location.state != null) {
            if (accepted) document.querySelector('#submit').removeAttribute('disabled')
            else document.querySelector('#submit').setAttribute('disabled', true)
        }
    }

    useEffect(() => canSubmit())

    const handleCheckboxes = (e) => {
        const id = +e.currentTarget.id
        if (e.currentTarget.checked) {
            setTags([...tags, id])
        }
        else {
            let tagIndex = tags.indexOf(id)
            if (tagIndex !== -1) {
                setTags(tags.filter((item, index) => {
                    return tagIndex !== index
                }))
            }
        }
    }
    
    const handleStep2 = async (e) => {
        e.preventDefault()

        const date = new Date().getFullYear()
        const birthYear = birth.split('-')[0]
        const user = await currentUser()

        let fixed = tags.map((item) => {
            return {
                id_tag : item
            }
        })
        if (fixed.length === 0) {
            MESSAGE_ERROR.tagsRequired()
            return
        }
        if (date - birthYear < 18) { 
            await userDelete()
            MESSAGE_ERROR.onlyAdults()
            setTimeout(() => { navigate('/') }, 2500)
        }
        else {
            const registered = {
                user_name: step1result?.username,
                email: step1result?.email,
                uid: user.uid,
                nome: fullName,
                data_nascimento: birth,
                foto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                biografia : 'Nada Informado',
                tags : fixed,
            }

            navigate('/register/step3', {
                state : {
                    user : registered
                }
            })
        }
    }

    if (location.state === null) 
        return <Navigate to='/register/step1' />
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
                            name="tag-checkbox" 
                            id="1" 
                            onChange={(e) => {handleCheckboxes(e)}}
                        />
                        <Label htmlFor="1">Escritor <div><i className="fa-solid fa-check"></i></div></Label>
                    </div>
                    <div>
                        <CheckBox 
                            type="checkbox" 
                            name="tag-checkbox" 
                            id="2" 
                            onChange={(e) => {handleCheckboxes(e)}}
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