import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { defaultUrl } from "../../helpers/url"
import { GenderCheck } from "./GenderCheck"
import { CheckBoxContainer, Form } from "./styles"

export const Step3 = () => {
    const location = useLocation()

    const [genders, setGenders] = useState([])

    useEffect(() => {
        fetch(`${defaultUrl}genero`)
        .then(response => response.json())
        .then(data => setGenders(data.message))
    }, [])

    const step2result = location.state.user
    console.log(step2result);

    const handleStep3 = (e) => {
        e.preventDefault()
    }

    return (
        <Form onSubmit={handleStep3}>
            <h1>Olá, {step2result.nome}</h1>
            <p>Escolha <span>até três gêneros</span> que você <span>lê e/ou escreve</span> para nos ajudar a lhe proporcionar uma experiência melhor.</p>
            <CheckBoxContainer>
                {genders.map(item => <GenderCheck key={item.id} id={item.id} nome={item.nome} />)}
            </CheckBoxContainer>
        </Form>
    )
}