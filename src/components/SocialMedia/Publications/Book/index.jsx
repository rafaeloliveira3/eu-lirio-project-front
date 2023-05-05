import { useEffect, useState } from "react"
import { useParams, useOutletContext, useNavigate } from "react-router-dom"
import axios from "axios"
import { defaultUrl } from "../../../helpers/url"
import { BookAndUserInfo, BookAndUserInfoContainer, BookContainer, BookData, BookExtrasSection, BookFormatsContainer, BookInfoContainer, BookInfoSection, BookTitleAndTagsContainer, BottomSection, BuyBookCard, BuyBookCardContainer, BuyButtonsContainer, Container, ImageContainer, RatingContainer, ReportContainer, StatsContainer, SynopsisContainer, TopSection } from "./styles"
import { Tags } from "../../Tags"
import { Rating } from "react-simple-star-rating"
import { StatsCard } from "../utils/StatsCard"
import Modal from "react-modal"
import { ModalContentContainer } from "../../Edit/styles"
import { UserCard } from "../utils/UserCard"
import { AvailableFormats } from "./AvailableFormats"
import { kFormatter } from "../../../helpers/formatters"
import { Comments } from "../Comments"
import { Complaints } from "../utils/Complaints"

const buyButtonVisible = {
    display : "block"
}
const buyButtonInisible = {
    display : "none"
}

export const Book = () => {

    const navigate = useNavigate()

    const { id } = useParams()
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()
    const [rating, setRating] = useState(0)
    const [date, setDate] = useState("")

    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [read, setRead] = useState(false)
    const [status, setStatus] = useState(false)

    const [complaintTypes, setComplaintTypes] = useState([])

    const [reportModal, setReportModal] = useState(false)
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)

    const [bookFormats, setBookFormats] = useState(["PDF", "ePUB", "MOBI"])
    const [comment, setComment] = useState(false)

    const [complaintReason, setComplaintReason] = useState(0)
    const [complaintDescription, setComplaintDescription] = useState("")

    const [refresh, setRefresh] = useState(false)

    const userId = localStorage.getItem('id')

    useEffect(() => {
        setAdsDisplay(true)
        setSearchbarDisplay(false)
        setFeedWidth(true)
    })
    const [book, setBook] = useState({classificacao:[""], usuario:[""]})

    useEffect(() => {
        const getBookById = async () => {
            const data = await axios.get(`${defaultUrl}announcement/id/?announcementId=${id}&userId=${userId}`)
            .catch(err => console.log(err))

            setRefresh(false)
            console.log(userId);
            console.log(data.data);

            if (data?.data[0].curtido)
                setLiked(true)
            if (data?.data[0].favorito)
                setFavorited(true)
            if (data?.data[0].lido)
                setRead(true)
            if (data?.data[0].comprado)
                setStatus("ITEM JÁ NA ESTANTE")
            if (data?.data[0].carrinho)
                setStatus("VER NO CARRINHO")
            if (data?.data[0].mobi === 'null' || data?.data[0].mobi === 'undefined')
                setBookFormats(["PDF", "ePUB", false])

            if (data?.data[0]?.usuario[0]?.id_usuario === userId)
                setComment(true)
            else 
                setComment(false)
            if (!data?.data[0]?.comprado)
                setComment(true)
            else 
                setComment(false)
            
            setRating(data?.data[0]?.avaliacao?.toFixed(1) || 0)
            setDate(() => {
                const months = ["Jan.", "Fev.", "Mar.", "Abr.", "Mai.", "Jun.", "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."]
                const date = data?.data[0]?.data.split("T")[0].split("-") || false
                if (date) {
                    const monthName = months[parseInt(date[1]) - 1]
                    return `${date[2]} ${monthName} ${date[0]}`
                }
                return ""
            })
            setBook(data?.data[0])
        }
        getBookById()
    }, [id, userId, liked, favorited, read, refresh])

    useEffect(() => {
        const getComplaints = async () => {
            const data = await axios.get(`${defaultUrl}complaint-types`)

            setComplaintTypes(data?.data)
        }
        getComplaints()
    }, [id])

    console.log(complaintTypes)

    const handleCloseModal = () => {
        setIsReportModalOpen(false)
    }
    const handleOpenModal = () => {
        setIsReportModalOpen(true)
    }

    const handleLike = async (e) => {
        const clickStatus = !liked
        setLiked(clickStatus)
        if (clickStatus) {
            await axios.post(`${defaultUrl}like-announcement`, {
                id_anuncio : id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}dislike-announcement`, {
                id_anuncio : id,
                id_usuario : userId
            })
        }
    }
    const handleFavorite = async () => {
        const clickStatus = !favorited
        setFavorited(clickStatus)
        if (clickStatus) {
            await axios.post(`${defaultUrl}favorite-announcement`, {
                id_anuncio : id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}unfavorite-announcement`, {
                id_anuncio : id,
                id_usuario : userId
            })
        }
    }
    const handleRead = async () => {
        const clickStatus = !read
        setRead(clickStatus)
        if (clickStatus) {
            await axios.post(`${defaultUrl}mark-announcement-as-read`, {
                id_anuncio : id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}unread-announcement`, {
                id_anuncio : id,
                id_usuario : userId
            })
        }
    }
    const handleCart = async() => {
        if (status !== "ITEM JÁ NA ESTANTE") {
            if (status !== "VER NO CARRINHO") {
                setStatus("VER NO CARRINHO")
                await axios.post(`${defaultUrl}new-cart-item/user-id/${userId}`, {
                    id_anuncio : [{
                        id : id
                    }]
                })
            }
            else {
                navigate('/app/cart')
            }
        }
        else {
            window.open(book?.epub, '_blank').focus()
        }
    }
    const handleDirectBuy = async () => {
        await axios.post(`${defaultUrl}buy-announcement`, {
            id_anuncio: id,
            id_usuario : userId
        })
        setRefresh(true)
    }
    const handleComplaint = async (e) => {
        e.preventDefault()
        await axios.post(`${defaultUrl}report-announcement`, {
            descricao : complaintDescription,
            id_anuncio : id,
            tipo : [
                {
                    id_tipo_denuncia : complaintReason
                }
            ]
        })
    }

    return (
        <Container>
            <BookInfoSection>
                <BookData>
                    <ImageContainer>
                        <img src={book?.capa} alt="" />
                    </ImageContainer>
                    <BookContainer>
                        <TopSection>
                            <BookTitleAndTagsContainer>
                                <div className="title-tags">
                                    <div className="title">
                                        <span>{book?.titulo}</span>
                                    </div>
                                    <div className="tags">
                                        {book?.generos?.map((item) => <Tags key={item.id_genero} name={item?.nome} />)}
                                    </div>
                                </div>
                            </BookTitleAndTagsContainer>
                            <div className="icon-container" onClick={() => {
                                setReportModal(!reportModal)
                            }}>
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                            <ReportContainer display={reportModal ? "block" : "none"}>
                                <span onClick={handleOpenModal} ><i className="fa-solid fa-circle-exclamation"></i> Reportar Obra</span>
                            </ReportContainer>
                        </TopSection>
                        <BottomSection>
                            <RatingContainer>
                                <Rating 
                                onClick={() => {}} 
                                allowFraction 
                                readonly 
                                initialValue={rating}
                                fillColor="var(--purple-dark)"
                                emptyStyle={{color:"#0000"}}
                                SVGstrokeColor="var(--purple-dark)"
                                SVGstorkeWidth={1}
                                size={30}
                                />
                                <span className="rating">&#8226;</span>
                                <span className="rating rating-number">{rating}</span>
                            </RatingContainer>
                            <StatsContainer>
                                <StatsCard clickable onClick={handleLike} icon={`fa-${liked ? "solid" : "regular" } fa-heart`} name="curtidas" number={kFormatter(book?.curtidas?.quantidade_curtidas || 0)}/>
                                <div className="stats-separator"></div>
                                <StatsCard clickable onClick={handleFavorite} icon={`fa-${favorited ? "solid" : "regular" } fa-bookmark`} name="favoritos" number={kFormatter(book?.favoritos?.quantidade_favoritos || 0)}/>
                                <div className="stats-separator"></div>
                                <StatsCard clickable onClick={handleRead} icon={`fa-${read ? "solid" : "regular" } fa-check-circle`} name="lidos" number={kFormatter(book?.lidos?.quantidade_lidos || 0)}/>
                            </StatsContainer>
                        </BottomSection>
                    </BookContainer>
                </BookData>
            </BookInfoSection>
            <BookExtrasSection>
                <BookInfoContainer>
                    <BookAndUserInfoContainer>
                        <BookAndUserInfo>
                            <UserCard user={book?.usuario[0]?.id_usuario} name={book?.usuario[0]?.nome_usuario} username={book?.usuario[0]?.user_name} photo={book?.usuario[0]?.foto}/>
                            <div className="stats-separator"></div>
                            <StatsCard clickable={false} icon={`fa-solid fa-file-lines`} name="páginas" number={book?.quantidade_paginas} />
                            <div className="stats-separator"></div>
                            <StatsCard clickable={false} icon={`fa-solid fa-book`} name="volume" number={book?.volume} />
                            <div className="stats-separator"></div>
                            <StatsCard clickable={false} icon={`fa-solid fa-shopping-bag`} name="vendas" number={0} />
                            <div className="stats-separator"></div>
                            <StatsCard clickable={false} icon={`fa-solid fa-calendar-days`} name="publicação" number={date} />
                            <div className="stats-separator"></div>
                            <img src={book?.classificacao[0]?.icone} alt="" className="classificacao" />
                        </BookAndUserInfo>
                    </BookAndUserInfoContainer>
                    <SynopsisContainer>
                        <span>Sinopse</span>
                        <p>{book?.sinopse}</p>
                    </SynopsisContainer>
                </BookInfoContainer>
                <BuyBookCardContainer>
                    <BuyBookCard>
                        <BookFormatsContainer>
                            <span>
                                Disponível em:
                            </span>
                            <ul>
                                {bookFormats.map(item => item ? <AvailableFormats name={item} book={book} key={item}/> : null)}
                            </ul>
                        </BookFormatsContainer>
                        <BuyButtonsContainer theme={status ? buyButtonInisible : buyButtonVisible} >
                            <h1>R$ {book?.preco?.toFixed(2)}</h1>
                            <button onClick={handleCart}>{status ? status : "ADICIONAR AO CARRINHO"}</button>
                            <button onClick={handleDirectBuy} className="direct-buy-button">COMPRAR</button>
                        </BuyButtonsContainer>
                    </BuyBookCard>
                </BuyBookCardContainer>
            </BookExtrasSection>
            {
                comment ? <></> : <Comments id={id} type={1} />
            }
            <Modal
                isOpen={isReportModalOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="delete-modal-overlay"
                className="delete-modal-content"
            >
                <ModalContentContainer>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h2>Reportar Obra</h2>
                    <form onSubmit={handleComplaint}>
                        <div>
                            {
                                complaintTypes?.map(item => <Complaints key={item.id} id={item.id} onChange={e => setComplaintReason(e.currentTarget.value)} name={item.tipo}/>)
                            }
                        </div>
                        <input 
                            value={complaintDescription} 
                            onChange={e => setComplaintDescription(e.currentTarget.value)} 
                            required 
                            type="text" 
                            placeholder="Motivo da Denúncia"
                        />
                        <button type="submit">Enviar</button>
                    </form> 
                </ModalContentContainer>
            </Modal>
        </Container>
    )
}