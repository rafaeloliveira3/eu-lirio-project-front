import { useState } from "react"
import { Rating } from "react-simple-star-rating"
import Toggle from "react-styled-toggle"
import { AvaliationContainer, Container, FormContainer } from "./styles"

export const Comments = () => {

    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [spoilerStatus, setSpoilerStatus] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <AvaliationContainer>
                <h2><i className="fa-regular fa-comment"></i> Avaliações do Livro (2)</h2>
                <FormContainer onSubmit={handleSubmit}>
                    <div className="inputs">
                        <input 
                            placeholder="Título" 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                        <textarea 
                            className="description"
                            placeholder="Comente sobre a sua experiência com este livro"
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        >
                        </textarea>
                    </div>
                    <div className="utils">
                        <Rating 
                            onClick={(rate) => {setRating(rate)}} 
                            allowFraction 
                            fillColor="var(--purple-dark)"
                            emptyStyle={{color:"#0000"}}
                            SVGstrokeColor="var(--purple-dark)"
                            SVGstorkeWidth={1}
                            size={35}
                        />
                        <div className="buttons-container">
                            <Toggle
                                labelRight="Spoiler"
                                onChange={() => setSpoilerStatus(!spoilerStatus)}
                                checked={spoilerStatus}
                                backgroundColorChecked={"var(--purple-dark)"}
                            ></Toggle>
                            <button title="Enviar"><i className="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                </FormContainer>
            </AvaliationContainer>
        </Container>
    )
}