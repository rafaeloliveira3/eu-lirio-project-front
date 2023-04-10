import { Card } from "../utils/Card"
import { Container, MessageError } from "./styles"
import { useState } from "react";

export const Published = (props) => {
    const type = props.type 
    const [err, setErr] = useState("")
    let anuncios
    let url

    if (type === 1) {
        anuncios = props.user?.anuncios
        if (anuncios === undefined) {
            if (err === "") {
                setErr("Você não tem nenhum livro cadastrado!")
            }
        }
        else if(err !== "") setErr("")
        url = 'announcement'
    }
    else {
        anuncios = props.user?.historias_curtas
        if (anuncios === undefined) {
            if (err === "") {
                setErr("Você não tem nenhuma curta cadastrada!")
            }
        }
        else if(err !== "") setErr("")
        url = 'short-storie'
    }

    if (err !== "") {
        return (
            <MessageError>{err}</MessageError>
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