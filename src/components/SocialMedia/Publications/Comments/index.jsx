import axios from "axios"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"
import Toggle from "react-styled-toggle"
import { defaultUrl } from "../../../helpers/url"
import { AvaliationContainer, Container, FormContainer } from "./styles"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from "../../../helpers/toasts"

export const Comments = (props) => {

    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [spoilerStatus, setSpoilerStatus] = useState(false)

    const userId = localStorage.getItem('id')

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data

        const json = {
            titulo : title,
            resenha : description,
            id_resposta : null,
            spoiler : `${spoilerStatus}`,
            avaliacao : rating,
            id_usuario : userId
        }
        if (props.type === 1) {
            json.id_anuncio = props.id

            data = await axios.post(`${defaultUrl}announcement-comment`, json)
            .catch((err) => {
                MESSAGE_ERROR.default(err)
            })

            if (data.status === 200) {
                window.location.reload()
            }
        }
        else if (props.type === 2) {
            json.id_historia_curta = props.id

            data = await axios.post(`${defaultUrl}short-storie-comment`, json)
            .catch((err) => {
                MESSAGE_ERROR.default(err)
            })
        }
        
        if (data?.status === 200) {
            MESSAGE_SUCCESS.register("Comentário")
        }
        else {
            MESSAGE_ERROR.bdError()
        }
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
                            fillColor="var(--purple-dark)"
                            emptyStyle={{color:"#0000"}}
                            SVGstrokeColor="var(--purple-dark)"
                            SVGstorkeWidth={1}
                            size={35}
                        />
                        <div className="buttons-container">
                            <Toggle
                                labelRight="Spoiler"
                                checked={spoilerStatus}
                                onChange={() => setSpoilerStatus(!spoilerStatus)}
                                backgroundColorChecked={"var(--purple-dark)"}
                            ></Toggle>
                            <button title="Enviar"><i className="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </div>
                </FormContainer>
            </AvaliationContainer>
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={4000} />
        </Container>
    )
}