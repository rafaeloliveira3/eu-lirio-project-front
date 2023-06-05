import { Interweave } from "interweave"
import { useState } from "react";
import { Link } from "react-router-dom"
import { kFormatter } from "../../helpers/formatters";
import { Container, ContentContainer, NavBar, StoryContainer, StoryDataContainer } from "./styles"
import { defaultUrl } from "../../helpers/url";
import axios from "axios";
import { useEffect } from "react";

export const Content = (props) => {

    const [comented, setComented] = useState(false)
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [read, setRead] = useState(false)

    useEffect(() => {
        if (props.short?.curtido) 
            setLiked(true)
        if (props.short?.favorito) 
            setFavorited(true)
        if (props.short?.lido) 
            setRead(true)
        if (props.short?.comentado) 
            setComented(true)
    }, [props.short])

    const userId = localStorage.getItem('id')

    const handleLike = async (e) => {
        const status = !liked
        setLiked(!liked)
        if (status) {
            await axios.post(`${defaultUrl}like-short-storie`, {
                id_historia_curta : props.short?.id,
                id_usuario : userId
            })
            props.reload()
        }
        else {
            await axios.post(`${defaultUrl}dislike-short-storie`, {
                id_historia_curta : props.short?.id,
                id_usuario : userId
            })
            props.reload()
        }
    }
    const handleFavorite = async () => {
        const status = !favorited
        setFavorited(!favorited)
        props.reload()
        if (status) {
            await axios.post(`${defaultUrl}favorite-short-storie`, {
                id_historia_curta : props.short?.id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}unfavorite-short-storie`, {
                id_historia_curta : props.short?.id,
                id_usuario : userId
            })
        }
    }
    const handleRead = async () => {
        const status = !read
        setRead(!read)
        if (status) {
            await axios.post(`${defaultUrl}mark-storie-as-read`, {
                id_historia_curta : props.short?.id,
                id_usuario : userId
            })
            props.reload()
        }
        else {
            await axios.post(`${defaultUrl}unread-short-storie`, {
                id_historia_curta : props.short?.id,
                id_usuario : userId
            })
            props.reload()
        }
    }
    return (
        <Container>
            <NavBar>
                <Link to={`/app/profile/${props?.author?.id_usuario}`} className="author">
                    <img src={props?.author?.foto} alt="" />
                    <span className="author-name">por <span>@{props?.author?.user_name}</span></span>
                </Link>
                <ul className="nav-bar">
                    <li>
                        <Link to="/app/feed" title="Home">
                            <i className="fa-solid fa-spa"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/me" title="Meu Perfil">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/favorites" title="Favoritos">
                            <i className="fa-solid fa-bookmark"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/read" title="Lidos">
                            <i className="fa-solid fa-check-circle"></i>

                        </Link>
                    </li>
                    <li>   
                        <Link title="Estante">
                            <i className="fa-solid fa-swatchbook"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/my-publications" title="Minhas Obras">
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/app/cart" title="Carrinho">
                            <i className="fa-solid fa-shopping-cart"></i>
                        </Link>
                    </li>
                </ul>
            </NavBar>
            <StoryContainer>
                <StoryDataContainer>
                    {props.short?.titulo}
                    <div>
                        <button><i className={comented ? "fa-solid fa-comment" : "fa-regular fa-comment"}></i> {kFormatter(props.short?.comentarios?.quantidade_comentarios || 0)}</button>
                        <button onClick={handleLike}><i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> {kFormatter(props.short?.curtidas?.quantidade_curtidas || 0)}</button>
                        <button onClick={handleFavorite}><i className={favorited ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i> {kFormatter(props.short?.favoritos?.quantidade_favoritos || 0)}</button>
                        <button onClick={handleRead}><i className={read ? "fa-solid fa-circle-check" : "fa-regular fa-circle-check"}></i>  {kFormatter(props.short?.lidos?.quantidade_lidos || 0)}</button>
                    </div>
                </StoryDataContainer>
                <ContentContainer>
                    <Interweave content={props?.short?.historia}/>
                </ContentContainer>
            </StoryContainer>
        </Container>
    )
}