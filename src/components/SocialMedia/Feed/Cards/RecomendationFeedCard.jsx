import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { BookCard, RecomendationContainer, SmallGenreContainer, TextContainer, UserContainer, InteractionsContainer } from "./styles"
import { useNavigate } from "react-router-dom"
import ShowMoreText from "react-show-more-text"
import { Genres } from "./Genres"
import { Rating } from "react-simple-star-rating"
import { kFormatter } from "../../../helpers/formatters"

export const RecomendationFeedCard = (props) => {
    const navigate = useNavigate()
    const [recomendation, setRecomendation] = useState({})
    const [user, setUser] = useState({})
    const userId = localStorage.getItem('id')

    const [showMore, setShowMore] = useState(false)
    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const [book, setBook] = useState({usuario:[]})

    useEffect(() => {
        setRefresh(false)
        const getRecomendation = async () => {
            const data = await axios.get(`${defaultUrl}recommendation/id/?recommendationId=${props.id}&userId=${userId}`)
            .catch(err => console.log(err))
    
            if (data?.data[0].curtido)
                setLiked(true)
            if (data?.data[0].favorito)
                setFavorited(true)

            setRecomendation(data?.data[0])
                
            const getUser = async (id) => {
                const data = await axios.get(`${defaultUrl}user/id/?searchUser=${id}&currentUser=${userId}`)
                .catch(err => console.log(err))

                setUser(data?.data)
            }
            const getBook = async (id) => {
                const data = await axios.get(`${defaultUrl}announcement/id/?announcementId=${id}&userId=${userId}`)
                .catch(err => console.log(err))

                setBook(data?.data[0])
            }
            
            await getUser(data?.data[0]?.id_usuario)
            await getBook(data?.data[0]?.id_anuncio)
        }
        
        getRecomendation()
    }, [props.id, liked, favorited, refresh])
    
    const handleClick = (e) => {
        const id = e.currentTarget.id
        if(props.type === 1)
            navigate(`/app/book/${id}`)
        else 
            navigate(`/app/short/${id}`)
    }

    const handleLike = async (e) => {
        e.stopPropagation()
        const status = !liked
        setLiked(status)
        if (status) {
            await axios.post(`${defaultUrl}like-recommendation`, {
                id_usuario : userId,
                id_recomendacao : recomendation?.id
            })
        }
        else {
            await axios.delete(`${defaultUrl}dislike-recommendation?recommendationId=${recomendation?.id}&userId=${userId}`)
        }
        setRefresh(true)
    }
    const handleFavorite = async (e) => {
        e.stopPropagation()
        const status = !favorited
        setFavorited(status)
        if (status) {
            await axios.post(`${defaultUrl}favorite-recommendation`, {
                id_usuario : userId,
                id_recomendacao : recomendation?.id
            })
        }
        else {
            await axios.delete(`${defaultUrl}unfavorite-recommendation?recommendationId=${recomendation?.id}&userId=${userId}`)
        }
        setRefresh(true)
    }

    return (
        <RecomendationContainer>
            <UserContainer onClick={() => navigate(`/app/profile/${user?.id}`)}>
                <div className="image-container">
                    <img src={user?.foto} alt="" />
                </div>
                <div className="name-container">
                    <h3>{user?.nome}</h3>
                    <span>@{user?.user_name}</span>
                </div>
            </UserContainer>
            <TextContainer>
                <p>
                    <ShowMoreText 
                    onClick={() => setShowMore(!showMore)}
                    anchorClass="show-more-button"
                    more="Mostrar Mais"
                    less="Mostrar Menos"
                    lines={4}
                    >
                        {recomendation?.conteudo}
                    </ShowMoreText>
                </p>
            </TextContainer>
            <BookCard onClick={() => navigate(`/app/book/${book?.id}`)}>
                <div className="image-container">
                    <img src={book?.capa} alt="" />
                </div>
                <div className="book-info-container">
                    <div className="title-container">
                        <span className="title">{book?.titulo}</span>
                        <span className="author">Escrito por <span>@{book?.usuario[0]?.user_name}</span></span>
                        <SmallGenreContainer>
                            {
                                book?.generos?.map(item => <Genres key={item.id_genero} name={item.nome}/>)
                            }
                        </SmallGenreContainer>
                    </div>
                    <div className="book-extras-container">
                        <span>R$ {book?.preco?.toFixed(2)}</span>
                        <div>
                            <Rating 
                            onClick={() => {}} 
                            allowFraction 
                            readonly 
                            initialValue={book?.avaliacao}
                            fillColor="var(--purple-dark)"
                            emptyStyle={{color:"#0000"}}
                            SVGstrokeColor="var(--purple-dark)"
                            SVGstorkeWidth={1}
                            size={25}
                            />
                            <span className="rating">&#8226;</span>
                            <span className="rating rating-number">{book?.avaliacao}</span>
                        </div>
                    </div>
                </div>
            </BookCard>
            <InteractionsContainer>
                <button onClick={handleLike}>{kFormatter(recomendation?.curtidas?.quantidade_curtidas)} <i className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i></button>
                <div className="separator"></div>
                <button onClick={handleFavorite}>{kFormatter(recomendation?.favoritos?.quantidade_favoritos)} <i className={favorited ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i></button>
            </InteractionsContainer>
        </RecomendationContainer>
    )
}