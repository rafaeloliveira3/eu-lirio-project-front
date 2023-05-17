import { useEffect } from "react"
import { useState } from "react"
import { Card } from "../../../Feed/Cards/Card"
import { useOutletContext } from "react-router-dom"
import { Loader } from "../../../Feed/Ebooks/styles"
import { MessageError } from "../../../UserPublications/Published/styles"

export const UserShorts = () => {
    const { user } = useOutletContext()

    const [books, setBooks] = useState([])
    const [load, setLoad] = useState(true)
    const [error, setError] = useState(false)
    const userId = localStorage.getItem('id')

    useEffect(() => {
        if (user?.historias_curtas_ativas === undefined) {
            setError(true)
        }
        else {
            setError(false)
            setBooks(user?.historias_curtas_ativas)
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
            <MessageError>Parece que este usuário não possuí histórias curtas</MessageError>
        )
    }
    return (
        <>
            {
                books?.map(item => <Card url="short-storie" key={item.id} id={item.id} anuncio={item} type={2}/>)
            }
        </>
    )
}