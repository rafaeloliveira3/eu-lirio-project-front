import axios from "axios"
import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import { defaultUrl } from "../../../helpers/url"
import { Card } from "../../Feed/Cards/Card"
import { CardsContainer, Loader, LoaderContainer, FilterContainer  } from "../styles"

export const ShortsSearch = () => {

    const { setPrompt } = useOutletContext()

    const prompt = useParams()
    const userId = localStorage.getItem('id')

    const [announcements, setAnnouncements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

    useEffect(() => {
        setError(false)
        setLoading(true)
    }, [prompt.prompt])

    useEffect(() => {
        setPrompt(prompt.prompt)
        const getBooksbyName = async () => {
            const data = await axios.get(`${defaultUrl}short-stories/storie-title/?shortStorieTitle=${prompt.prompt}&userId=${userId}`)
            .catch(err => {
                if (err.code === 'ERR_NETWORK') {
                    setError("Algo deu errado, tente novamente mais tarde")
                }
                else {
                    setError("Nenhum item corresponde com sua busca!")
                }
            })
            
            setLoading(false)
            setAnnouncements(data?.data)
        }
        getBooksbyName()
    }, [prompt.prompt, userId])


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
            <>
            <FilterContainer>
                    <h2 onClick={() => setIsFilterModalOpen(true)}>Filtros <i className="fa-solid fa-angle-down"></i></h2>
            </FilterContainer>
            <CardsContainer>
                {announcements?.map((item) => <Card url="short-storie" key={item.id} id={item.id} anuncio={item} type={1} />)}
            </CardsContainer>
            </>
        )
    }
}