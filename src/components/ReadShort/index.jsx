import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { AuthorData, Container, ContentContainer, DataContainer, Header } from "./styles"
import logo from "../../assets/img/logo.svg"
import { Content } from "./Content"

export const ReadShort = () => {

    const { id } = useParams()
    const userId = localStorage.getItem('id')

    const [short, setShort] = useState([])
    const [author, setAuthor] = useState([])
    const [reload, setReload] = useState(0)

    useEffect(() => {
        const getShortStorie = async () => {
            const data = await axios.get(`${defaultUrl}short-storie/id/?shortStorieId=${id}&userId=${userId}`)
            .catch(err => console.log(err))

            setShort(data?.data[0])
            setAuthor(data?.data[0]?.usuario[0])
            console.log(data?.data[0])
        }
        getShortStorie()
    }, [id, reload])
    const reloadSetter = () => {
        setReload(reload + 1)
    }

    return (
        <Container>
            <Header>
                <img src={logo} alt="" />
            </Header>
            <DataContainer>
                <AuthorData>
                    <span className="book-name">{short?.titulo}</span>
                    <span className="author-name">Escrito por <span>@{author?.user_name}</span></span>
                </AuthorData>
            </DataContainer>
            <ContentContainer>
                <Content author={author} reload={reloadSetter} short={short}/>
            </ContentContainer>
        </Container>
    )
}