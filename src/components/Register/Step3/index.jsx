import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, useLocation, useOutletContext, useNavigate } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { GenderCheck } from "./GenderCheck"
import { CheckBoxContainer, Form } from "./styles"
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../../helpers/toasts"
import { userDelete } from "../../helpers/firebase"
import { ToastContainer, toast } from "react-toastify"

export const Step3 = () => {
    const { setUrl } = useOutletContext()

    useEffect(() => {
        setUrl('/register/step2')
    })

    const navigate = useNavigate()
    const location = useLocation()

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])

    useEffect(() => {
        const getGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => console.log(err)) 

            setGenres(data?.data)
        }
        getGenres()
    }, [])

    const step2result = location?.state?.user

    const handleStep3 = async (e) => {
        e.preventDefault()

        let fixedGenres = selectedGenres.map((item) => {
            return {
                id_genero : item
            }
        })

        step2result.generos = fixedGenres
        const res = await axios.post(`${defaultUrl}user`, step2result)
        .catch(async (err) => { 
            console.log(err);
            await userDelete()
            if (err.request.status === 400) {
                MESSAGE_ERROR.default(err)
            }
            else {
                MESSAGE_ERROR.bdError()
            }
            setTimeout(() => { navigate('/register/step1') }, 2500)
        })

        if (res.status === 201) {
            MESSAGE_SUCCESS.register("Usuário")
            setTimeout(() => { navigate('/login') }, 2500)
        }
    }

    const handleCheckboxes = (e) => {
        const id = +e.currentTarget.id
        if (e.currentTarget.checked) {
            setSelectedGenres([...selectedGenres, id])
        }
        else {
            let genreIndex = selectedGenres.indexOf(id)
            if (genreIndex !== -1) {
                setSelectedGenres(selectedGenres.filter((item, index) => {
                    return genreIndex !== index
                }))
            }
        }
    }

    if (location.state === null) 
        return <Navigate to="/register/step2" />
    return (
        <Form onSubmit={handleStep3}>
            <h1>Olá, {step2result.nome}</h1>
            <p>Escolha <span>até três gêneros</span> que você <span>lê e/ou escreve</span> para nos ajudar a lhe proporcionar uma experiência melhor.</p>
            <CheckBoxContainer>
                {genres?.map(item => <GenderCheck key={item?.id_genero} onChange={handleCheckboxes} id={item?.id_genero} nome={item?.nome_genero} />)}
            </CheckBoxContainer>
            <button className="button-submit">Finalizar</button>
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false} />
        </Form>
    )
}