import { Card } from "../utils/Card"
import { Container, MessageError } from "./styles"
import { useEffect, useState } from "react";
import axios from "axios";
import { defaultUrl } from "../../../helpers/url";

export const Desactivated = (props) => {
    const type = props.type 
    const [error, setError] = useState("")
    const [anuncios, setAnuncios] = useState([])
    const url = ["announcement", "short-storie"]

    useEffect(() => {
        const getDeactivatedBooks = async () => {
            const fixedUrl = url[parseInt(type)-1]
            if (props.user?.id !== undefined) {
                const data = await axios.get(`${defaultUrl}desactivated-${fixedUrl}/user-id/${props.user?.id}`)
                .catch((err) => {
                    if (err.response.status === 404) {
                        if (type === 1) {
                            setError("Você não tem nenhum livro desativado!")
                        }
                        else {
                            setError("Você não tem nenhuma curta desativada!")
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
    }, [url])

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