import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Card } from "../Cards/Card"
import { Container, Loader, LoaderContainer } from "./styles"

export const Shorts = () => {
    const [shorts, setShorts] = useState([])
    const [load, setLoad] = useState(true)

    const user = localStorage.getItem("id")

    useEffect(() => {
        const getShorts = async () => {
            const data = await axios.get(`${defaultUrl}short-story/user-id/${user}`)
            .catch(err => console.log(err))

            if (data?.data !== undefined) {
                setLoad(false)
                setShorts(data?.data)
            }
        }
        getShorts()
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
            {shorts?.map((item) => <Card url="short-storie" key={item.id} id={item.id} anuncio={item} type={2} />)}
        </Container>
    )
}