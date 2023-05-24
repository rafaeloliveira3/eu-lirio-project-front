import { useState } from "react"
import { Link } from "react-router-dom"
import exampleBook from "../../../assets/img/Example Book.png"
import { Container, ExampleContainer, InfoContainer, SpanButton } from "./styles"

export const Section1 = () => {

    const [textSetter, setTextSetter] = useState("Uma plataforma para você públicar e lucrar com suas obras de forma online e gratuita?")
    const [focus, setFocus] = useState(false)

    const border = {
        borderActive : "2px solid var(--yellow-medium)",
        borderDisabled : "2px solid #0000"
    }

    return (
        <Container>
            <InfoContainer>
                <div className="main-container">
                    <div className="span-container">
                        <SpanButton border={focus ? border.borderDisabled : border.borderActive} onClick={() => {setTextSetter("Uma plataforma para você públicar e lucrar com suas obras de forma online e gratuita?"); setFocus(false)}}><i className="fa-sharp fa-solid fa-pen-nib"></i> Para Escrever</SpanButton>
                        <SpanButton border={focus ? border.borderActive : border.borderDisabled} onClick={() => {setTextSetter("Uma plataforma para você conhecer novas histórias, novos mundos e ainda apoiar a literatura nacional?"); setFocus(true)}}><i className="fa-solid fa-book"></i> Para Ler</SpanButton>
                    </div>
                    <span className="text-container">
                        <h1>JÁ IMAGINOU...?</h1>
                        <span>
                            {textSetter}
                        </span>
                    </span>
                </div>
                <Link to="/login" className="button-container">
                    <button>COMECE AGORA!</button>
                </Link>
            </InfoContainer>
            <ExampleContainer>
                <img src={exampleBook} alt="" />
                <span>
                    <span className="title">Livro de Exemplo</span>
                    <span className="price">R$ 20,00</span>
                </span>
            </ExampleContainer>
        </Container>
    )
}