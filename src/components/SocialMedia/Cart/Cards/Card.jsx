import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Genres } from "./Genres"
import { ContentContainer, GenreContainer, ItemContainer, ItemText } from "./styles"
import { useNavigate } from "react-router-dom"

export const Card = (props) => {
    const navigate = useNavigate()
    const [anuncio, setAnuncio] = useState({})
    const user = localStorage.getItem('id')

    useEffect(() => {
        const getAnuncio = async () => {
            const data = await axios.get(`${defaultUrl}announcement/id/?announcementId=${props.id}&userId=${user}`)
            .catch(err => console.log(err))
            
            setAnuncio(data?.data[0])
        }
        getAnuncio()
    }, [props.id])
    
    const handleClick = (e) => {
        const id = e.currentTarget.id
        sessionStorage.setItem('index', '0')
        navigate(`/app/book/${id}`)
    }
    const handleRemovefromCart = async (e) => {
        e.stopPropagation()
        await axios.delete(`${defaultUrl}delete-cart-item/?announcementId=${props.id}&userId=${user}`)
        props.refresh()
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
                <GenreContainer>
                    {
                        anuncio?.generos?.map((item) => <Genres key={item.id_genero} name={item.nome} />)
                    }
                </GenreContainer>
                <ContentContainer>
                    <div>
                        <span>R$ {anuncio?.preco}</span>
                        <button title="Remover do Carrinho" onClick={handleRemovefromCart}><i className="fa-solid fa-trash"></i></button>
                    </div>
                </ContentContainer>
            </ItemText>
        </ItemContainer>
    )
}