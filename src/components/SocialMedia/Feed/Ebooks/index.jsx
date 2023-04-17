import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Card } from "../Cards/Card"
import { Container, Loader, LoaderContainer } from "./styles"

export const Ebooks = () => {
    const [books, setBooks] = useState([])
    const [load, setLoad] = useState(true)

    const user = localStorage.getItem("id")

    useEffect(() => {
        const getBooks = async () => {
            const data = await axios.get(`${defaultUrl}announcements/user-id/${user}`)
            .catch(err => console.log(err))
            console.log(user);

            setLoad(false)
            setBooks(data?.data)
        }
        getBooks()
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
            {books?.map((item) => <Card url="announcement" key={item.id} id={item.id} anuncio={item} type={1} />)}
        </Container>
    )
}