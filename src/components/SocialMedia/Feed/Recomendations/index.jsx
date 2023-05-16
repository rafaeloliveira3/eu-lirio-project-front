import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { RecomendationCard, RecomendationFeedCard } from "../Cards/RecomendationFeedCard"
import { Container, Loader, LoaderContainer } from "./styles"

export const Recomendations = () => {
    const [recomendations, setRecomendations] = useState([])
    const [load, setLoad] = useState(true)

    const user = localStorage.getItem("id")

    useEffect(() => {
        const getRecomendations = async () => {
            const data = await axios.get(`${defaultUrl}recommendations/user-id/${user}`)
            .catch(err => console.log(err))
            
            if (data?.data !== undefined) {
                setLoad(false)
                setRecomendations(data?.data)
            }
        }
        getRecomendations()
    }, [1])

    if (load) {
        return (
            <LoaderContainer>
                <Loader className="fa-solid fa-circle-notch"></Loader>
            </LoaderContainer>
        )
    }
    return (
        <Container>
            {recomendations?.map((item) => <RecomendationFeedCard key={item.id} id={item.id} />)}
        </Container>
    )
}