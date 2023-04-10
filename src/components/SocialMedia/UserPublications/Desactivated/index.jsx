import { Card } from "../utils/Card"
import { Container, MessageError } from "./styles"
import { useEffect, useState } from "react";
import axios from "axios";
import { defaultUrl } from "../../../helpers/url";

export const Desactivated = (props) => {
    const type = props.type 
    const [error, setError] = useState("")
    const [anuncios, setAnuncios] = useState([])
    const [url, setUrl] = useState(() => {
        if (type === 1) return 'announcements'
        else return 'short-stories'
    })

    useEffect(() => {
        const getDeactivatedBooks = async () => {
            const data = await axios.get(`${defaultUrl}desactivated-${url}/user-id/${props.user?.id}`)
            .catch((err) => {
                if (err.response.status === 404) {
                    if (type === 1) {
                        setError("Você não tem nenhum livro desativado!")
                    }
                    else {
                        setError("Você não tem nenhuma curta desativado!")
                    }
                }
            })
            setAnuncios(data?.data)
            console.log(anuncios);
        }
        getDeactivatedBooks()
    })

    if (error !== "") {
        return (
            <MessageError>{error}</MessageError>
        )
    }
    return (
        <Container>
            {
                anuncios?.map((item) => <Card type={type} url={url} key={item.id} anuncio={item} />) 
            }
        </Container>
    )
}