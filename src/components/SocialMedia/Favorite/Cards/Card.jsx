import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Genres } from "./Genres"
import { ContentContainer, GenreContainer, ItemContainer, ItemText, LikesContainer } from "./styles"
import { useNavigate } from "react-router-dom"
import { kFormatter } from "../../../helpers/formatters"

export const Card = (props) => {
    const navigate = useNavigate()
    const url = props.url
    const [anuncio, setAnuncio] = useState({})
    const user = localStorage.getItem('id')
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)

    useEffect(() => {
        const getAnuncio = async () => {
            const urlFix = () => {
                if (url === "short-storie") {
                    return "shortStorie"
                }
                return url
            }
            const data = await axios.get(`${defaultUrl}${url}/id/?${urlFix()}Id=${props.id}&userId=${user}`)
            .catch(err => console.log(err))

            if (data?.data[0].curtido) {
                setLiked(true)
            }
            if (data?.data[0].favorito) {
                setFavorited(true)
            }
            
            setAnuncio(data?.data[0])
        }
        getAnuncio()
    }, [props.id, liked, favorited])
    
    const handleClick = (e) => {
        const id = e.currentTarget.id
        if(props.type === 1)
            navigate(`/app/book/${id}`)
        else 
            navigate(`/app/short/${id}`)
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
                    <LikesContainer >
                        <button className="icon-container">
                            <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                            <span>{kFormatter(anuncio?.curtidas?.quantidade_curtidas || 0)}</span>
                        </button>
                        <div className="separator">

                        </div>
                        <button className="icon-container">
                            <i className={favorited ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                            <span>{kFormatter(anuncio?.favoritos?.quantidade_favoritos || 0)}</span>
                        </button>
                        <div className="separator">

                        </div>
                        <button className="icon-container">
                            <i className="fa-regular fa-circle-check"></i>
                            <span>{kFormatter(anuncio?.lidos?.quantidade_lidos || 0)}</span>
                        </button>
                    </LikesContainer>
                    <p>
                        {anuncio?.sinopse}
                    </p>
                </ContentContainer>
            </ItemText>
        </ItemContainer>
    )
}