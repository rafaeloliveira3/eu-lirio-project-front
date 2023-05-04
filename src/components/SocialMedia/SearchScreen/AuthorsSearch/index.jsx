import axios from "axios"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { defaultUrl } from "../../../helpers/url"
import { CardsContainer, Loader, LoaderContainer } from "../styles"
import { AuthorCard } from "../AuthorCard/Card"

export const AuthorsSearch = () => {
    const { setPrompt } = useOutletContext()

    const prompt = useParams()
    const userId = localStorage.getItem('id')

    const [author, setAuthor] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
        setLoading(true)
    }, [prompt.prompt])

    useEffect(() => {
        setPrompt(prompt.prompt)
        const getAuthorsbyName = async () => {
            const data = await axios.get(`${defaultUrl}user/user-name/?username=${prompt.prompt}&userId=${userId}`)
            .catch(err => {
                if (err.code === 'ERR_NETWORK') {
                    setError("Algo deu errado, tente novamente mais tarde")
                }
                else {
                    setError("Nenhum item corresponde com sua busca!")
                }
            })
            setLoading(false)
            setAuthor(data?.data)
        }
        getAuthorsbyName()
    }, [prompt.prompt])


    if (error) {
        return(
            <LoaderContainer>
                <span>Nenhum Item Corresponde com Sua Busca</span>
            </LoaderContainer>
        )
    }
    else if (loading) {
        return (
            <LoaderContainer>
                <Loader className="fa-solid fa-circle-notch"></Loader>
            </LoaderContainer>
        )
    }
    else {
        return (
            <CardsContainer>
                {author?.map((item) => <AuthorCard url="short-storie" key={item.id} id={item.id} author={item} />)}
            </CardsContainer>
        )
    }
}