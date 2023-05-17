import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { defaultUrl } from "../../../../helpers/url"
import { Card } from "../../../Feed/Cards/Card"
import { Loader } from "../../../Feed/Ebooks/styles"
import { MessageError } from "../../../UserPublications/Published/styles"

export const UserBooks = () => {
    const { user } = useOutletContext()

    const [books, setBooks] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const userId = localStorage.getItem('id')

    useEffect(() => {
        if (user?.anuncios_ativos === undefined) {
            setError(true)
        }
        else {
            setError(false)
            setBooks(user?.anuncios_ativos)
        }
        setLoad(false)
    }, [userId, user?.id])

    if (load) {
        return (
            <>
                <Loader className="fa-solid fa-circle-notch"></Loader>
            </>
        )
    }
    if (error) {
        return (
            <MessageError>Parece que este usuário não possuí livros</MessageError>
        )
    }
    return (
        <>
            {
                books?.map(item => <Card url="announcement" key={item.id} id={item.id} anuncio={item} type={1}/>)
            }
        </>
    )
}