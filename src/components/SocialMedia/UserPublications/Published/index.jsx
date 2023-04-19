import { Card } from "../utils/Card"
import { Container, MessageError } from "./styles"
import { useState, useEffect } from "react";
import { defaultUrl } from "../../../helpers/url";
import axios from "axios";
import { Loader, LoaderContainer } from "../utils/styles";

export const Published = (props) => {
    const type = props.type 
    const [error, setError] = useState("")
    const [anuncios, setAnuncios] = useState([])
    const [loading, setLoading] = useState(true)
    const url = ["announcement", "short-storie"]

    useEffect(() => {
        const getActivatedBooks = async () => {
            const fixedUrl = url[parseInt(type)-1]
            if (props.user?.id !== undefined) {
                const data = await axios.get(`${defaultUrl}activated-${fixedUrl}/user-id/${props.user?.id}`)
                .catch((err) => {
                    if (err.response?.status === 404) {
                        if (type === 1) {
                            setError("Você não tem nenhum livro cadastrado!")
                            setLoading(false)
                        }
                        else {
                            setError("Você não tem nenhuma curta cadastrada!")
                            setLoading(false)
                        }
                    }
                })
                if (data !== undefined) {
                    setLoading(false)
                    setError("")
                    setAnuncios(data?.data)
                }
            }
        }
        getActivatedBooks()
    }, [type, props.user?.id])

    if (loading) {
        return (
            <LoaderContainer>
                <Loader className="fa-solid fa-circle-notch"></Loader>
            </LoaderContainer>
        )
    }
    if (error !== "") {
        return (
            <MessageError>{error}</MessageError>
        )
    }
    return (
        <Container>
            {
                anuncios?.map((item) => <Card rd type={type} url={url[parseInt(type)-1]} key={item.id} anuncio={item} />) 
            }
        </Container>
    )
}