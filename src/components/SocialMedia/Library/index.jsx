import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { defaultUrl } from "../../helpers/url"
import { Card } from "./Cards/Card"
import { Container, Loader, LoaderContainer } from "./styles"
import { useOutletContext } from "react-router-dom"

export const Library = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })


    const [books, setBooks] = useState([])
    const [load, setLoad] = useState(true)

    const user = localStorage.getItem("id")
    let change = sessionStorage.getItem('favorited-change')

    useEffect(() => {
        const getBooks = async () => {
            const data = await axios.get(`${defaultUrl}purchased-announcements/user-id/${user}`)
            .catch(err => console.log(err))
            
            if (data?.data !== undefined) {
                setLoad(false)
                setBooks(data?.data)
            }
        }
        getBooks()
    }, [change])

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