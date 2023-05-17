import { useEffect } from "react"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { RecomendationFeedCard } from "../../../Feed/Cards/RecomendationFeedCard"
import { Loader } from "../../../Feed/Ebooks/styles"
import { MessageError } from "../../../UserPublications/Published/styles"

export const UserRecomendations = () => {

    const { user } = useOutletContext()

    const [recomendations, setRecomendations] = useState([])
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(true)
    const userId = localStorage.getItem('id')

    useEffect(() => {
        if (user?.recomendacoes === undefined) {
            setError(true)
        }
        else {
            setError(false)
            setRecomendations(user?.recomendacoes)
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
            <MessageError>Parece que este usuário não possuí nenhuma recomendação</MessageError>
        )
    }
    return (
        <>
            {
                recomendations?.map(item => <RecomendationFeedCard key={item.id} id={item.id}/>)
            }
        </>
    )
}