import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../helpers/url"
import { isMobile } from "react-device-detect"
import { Loader } from "../SocialMedia/Feed/Ebooks/styles"
import { Container, IconSuccess } from "./styles"


export const ConfirmBuy = () => {
    const [load, setLoad] = useState(true)

    useEffect(() => {
        const confirmBuy = async () => {
            let data
            if (localStorage.getItem('buy_intent_type') === "direct") {
                data = await axios.post(`${defaultUrl}intent-directly-payment-update`, {
                    id_usuario : localStorage.getItem('id'),
                    id_anuncio : localStorage.getItem('buy_book_id'),
                    id_stripe : localStorage.getItem('buy_intent_id')
                })
            }
            else {
                data = await axios.post(`${defaultUrl}intent-payment-update`, {
                    data : {
                        object : {
                            id : localStorage.getItem('buy_intent_id')
                        }
                    }
                })
            }

            if (data?.data?.received) {
                setLoad(false)
                localStorage.removeItem('buy_intent_id')
                localStorage.removeItem('buy_intent_type')
                localStorage.removeItem('buy_book_id')
            }
        }
        confirmBuy()
    })

    if (load) {
        return (
            <Container>
            <Loader className="fa-solid fa-circle-notch"></Loader>
            <h1>Processando...</h1>
            </Container>
        )
    }
    else {
        if (isMobile) {
            return (
                <Container>
                <IconSuccess className="fa-regular fa-circle-check"></IconSuccess>
                <h1>Compra efetuada com sucesso, você já pode voltar ao aplicativo.</h1>
                </Container>
            )
        }
        return (
            <Container>
            <IconSuccess className="fa-regular fa-circle-check"></IconSuccess>
            <h1>Compra efetuada com Sucesso, você já pode fechar essa guia.</h1>
            </Container>
        )
    }
}