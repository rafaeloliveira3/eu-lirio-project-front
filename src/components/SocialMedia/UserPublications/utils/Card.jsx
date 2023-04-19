import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Genres } from "./Genres"
import { ContentContainer, GenreContainer, ItemContainer, ItemText, LikesContainer } from "./styles"
import { useNavigate } from "react-router-dom"

export const Card = (props) => {
    const navigate = useNavigate()
    let url = props.url
    let shortStorieUrl
    const [anuncio, setAnuncio] = useState({})
    const userId = localStorage.getItem("id")

    useEffect(() => {
        const getAnuncio = async () => {
            if (url === 'short-storie') shortStorieUrl = "shortStorie"
            else shortStorieUrl = undefined
            
            const data = await axios.get(`${defaultUrl}${url}/id/?${shortStorieUrl || url}Id=${props.anuncio?.id}&userId=${userId}`)
            .catch(err => console.log(err))

            setAnuncio(data?.data[0])
        }
        getAnuncio()
    }, [1])
    
    const handleClick = (e) => {
        const id = e.currentTarget.id
        if(props.type === 1)
            navigate(`/app/book/edit/${id}`)
        else 
            navigate(`/app/short/edit/${id}`)
    }

    return (
        <ItemContainer id={anuncio?.id} onClick={handleClick}>
            <div className="cover-container">
                <img src={anuncio?.capa} alt="" />
            </div>
            <ItemText>
                <h2>
                    {anuncio?.titulo}
                </h2>
                <ContentContainer>
                    <GenreContainer>
                        {
                            anuncio?.generos?.map((item) => <Genres key={item.id_genero} name={item.nome} />)
                        }
                    </GenreContainer>
                    <LikesContainer>
                        <div className="icon-container">
                            <i className="fa-regular fa-heart"></i>
                            <span>{anuncio?.curtidas?.quantidade_curtidas || 0}</span>
                        </div>
                        <div className="separator">

                        </div>
                        <div className="icon-container">
                            <i className="fa-regular fa-circle-check"></i>
                            <span>4,1K</span>
                        </div>
                    </LikesContainer>
                    <p>
                        {anuncio?.sinopse}
                    </p>
                </ContentContainer>
            </ItemText>
        </ItemContainer>
    )
}