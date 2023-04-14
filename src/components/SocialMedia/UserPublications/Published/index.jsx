import { Card } from "../utils/Card"
import { Container, MessageError } from "./styles"
import { useState, useEffect } from "react";
import { defaultUrl } from "../../../helpers/url";
import axios from "axios";

export const Published = (props) => {
    const type = props.type 
    const [error, setError] = useState("")
    const [anuncios, setAnuncios] = useState([])
    const url = ["announcement", "short-storie"]

    useEffect(() => {
        const getDeactivatedBooks = async () => {
            const fixedUrl = url[parseInt(type)-1]
            if (props.user?.id !== undefined) {
                console.log(props.user?.id);
                const data = await axios.get(`${defaultUrl}activated-${fixedUrl}/user-id/${props.user?.id}`)
                .catch((err) => {
                    if (err.response.status === 404) {
                        if (type === 1) {
                            setError("Você não tem nenhum livro cadastrado!")
                        }
                        else {
                            setError("Você não tem nenhuma curta cadastrada!")
                        }
                    }
                })
                if (data !== undefined) {
                    setError("")
                    setAnuncios(data?.data)
                }
            }
        }
        getDeactivatedBooks()
    }, [type])

    if (error !== "") {
        return (
            <MessageError>{error}</MessageError>
        )
    }
    return (
        <Container>
            {
                anuncios?.map((item) => <Card type={type} url={url[parseInt(type)-1]} key={item.id} anuncio={item} />) 
            }
        </Container>
    )
}