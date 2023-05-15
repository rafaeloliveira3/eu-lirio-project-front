import { useEffect, useState } from "react"
import { useParams, useOutletContext, Link } from "react-router-dom"
import axios from "axios"
import { defaultUrl } from "../../../helpers/url"
import { BookAndUserInfo, BookAndUserInfoContainer, BookContainer, BookData, BookExtrasSection, BookInfoContainer, BookInfoSection, BookTitleAndTagsContainer, BottomSection, Container, ImageContainer, RatingContainer, ReadBookCardContainer, ReadButtonsContainer, ReportContainer, StatsContainer, SynopsisContainer, TopSection } from "./styles"
import { ReportForm } from "../Book/styles"
import { Tags } from "../../Tags"
import { Rating } from "react-simple-star-rating"
import { StatsCard } from "../utils/StatsCard"
import Modal from "react-modal"
import { ModalContentContainer } from "../../Edit/styles"
import { UserCard } from "../utils/UserCard"
import { dateFormatter, kFormatter } from "../../../helpers/formatters"
import { Comments } from "../Comments"
import { CommentsContainer, CommentSection } from "../Book/styles"
import { CommentsCard } from "../CommentsCard"
import { Complaints } from "../utils/Complaints"
import { MESSAGE_SUCCESS } from "../../../helpers/toasts"

export const ShortByID = () => {
    const { id } = useParams()
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()
    const [rating, setRating] = useState(0)
    const [date, setDate] = useState("")

    const [liked, setLiked] = useState(false)
    const [favorited, setFavorited] = useState(false)
    const [read, setRead] = useState(false)

    const [complaintTypes, setComplaintTypes] = useState([])
    const [complaintReason, setComplaintReason] = useState([])
    const [complaintDescription, setComplaintDescription] = useState("")

    const [reportModal, setReportModal] = useState(false)
    const [isReportModalOpen, setIsReportModalOpen] = useState(false)

    const [editButtonStatus, setEditButtonStatus] = useState(false)

    const [comment, setComment] = useState(false)

    const [comments, setComments] = useState([])

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
            const data = await axios.get(`${defaultUrl}short-storie/id/?shortStorieId=${id}&userId=${userId}`)
            .catch(err => console.log(err))

            setRefresh(false)
            setComment(false)

            if (data?.data[0].curtido)
                setLiked(true)
            if (data?.data[0].favorito)
                setFavorited(true)
            if (data?.data[0].lido)
                setRead(true)

            if (data?.data[0]?.usuario[0]?.id_usuario === userId)
                setEditButtonStatus(true)

            if (data?.data[0]?.usuario[0]?.id_usuario === userId || data?.data[0]?.comentado) {
                setComment(true)
            }
            else 
                setComment(false)
                    
            
            setDate(dateFormatter(data?.data[0]?.data))
            setRating(data?.data[0]?.avaliacao?.toFixed(1) || 0)
            setBook(data?.data[0])
        }
        getBookById()
    }, [id, userId, liked, favorited, read, refresh])

    useEffect(() => {
        const getComplaints = async () => {
            const data = await axios.get(`${defaultUrl}complaint-types`)
            setRefresh(false)

            setComplaintTypes(data?.data)
        }
        const getComments = async () => {
            const data = await axios.get(`${defaultUrl}short-storie-comments/id/?shortStorieId=${id}&userId=${userId}`)
            setRefresh(false)

            setComments(data?.data)
        }
        getComments()
        getComplaints()
    }, [id, refresh, userId])

    const handleCloseModal = () => {
        setIsReportModalOpen(false)
    }
    const handleOpenModal = () => {
        setIsReportModalOpen(true)
    }

    const handleLike = async () => {
        const status = !liked
        setLiked(!liked)
        if (status) {
            await axios.post(`${defaultUrl}like-short-storie`, {
                id_historia_curta : id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}dislike-short-storie`, {
                id_historia_curta : id,
                id_usuario : userId
            })
        }
    }
    const handleFavorite = async () => {
        const status = !favorited
        setFavorited(!favorited)
        if (status) {
            await axios.post(`${defaultUrl}favorite-short-storie`, {
                id_historia_curta : id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}unfavorite-short-storie`, {
                id_historia_curta : id,
                id_usuario : userId
            })
        }
    }
    const handleRead = async () => {
        const status = !read
        setRead(!read)
        if (status) {
            await axios.post(`${defaultUrl}mark-storie-as-read`, {
                id_historia_curta : id,
                id_usuario : userId
            })
        }
        else {
            await axios.post(`${defaultUrl}unread-short-storie`, {
                id_historia_curta : id,
                id_usuario : userId
            })
        }
    }

    const handleComplaint = async (e) => {
        e.preventDefault()

        const complaintType = complaintReason.map(item => {
            return {
                id_tipo_denuncia : item
            }
        })
        await axios.post(`${defaultUrl}report-short-storie/${userId}`, {
            descricao : complaintDescription,
            id_historia_curta : id,
            tipo : complaintType
        })
        setIsReportModalOpen(false)
        MESSAGE_SUCCESS.register("Denúncia")
    }
    const handleComplaintId = (e) => {
        const id = +e.currentTarget.id.split('-')[0]
        if (e.currentTarget.checked) {
            setComplaintReason([...complaintReason, id])
        }
        else {
            let complaintIndex = complaintReason.indexOf(id)
            if (complaintIndex !== -1) {
                setComplaintReason(complaintReason.filter((item, index) => {
                    return complaintIndex !== index
                }))
            }
        }
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
                            <div className="spacer">
                                <StatsCard clickable={false} icon={`fa-solid fa-calendar-days`} name="publicação" number={date} />
                                <div className="stats-separator"></div>
                                <img src={book?.classificacao[0]?.icone} alt="" className="classificacao" />
                            </div>
                        </BookAndUserInfo>
                    </BookAndUserInfoContainer>
                    <SynopsisContainer>
                        <span>Sinopse</span>
                        <p>{book?.sinopse}</p>
                    </SynopsisContainer>
                </BookInfoContainer>
                <ReadBookCardContainer>
                    <ReadButtonsContainer>
                        <Link to={`/short/read/${id}`}><button>LER</button></Link>
                        { 
                            editButtonStatus ? <Link to={`/app/short/edit/${id}`}><button>EDITAR</button></Link> : <></>
                        }
                    </ReadButtonsContainer>
                </ReadBookCardContainer>
            </BookExtrasSection>
            {
                comment ? <></> : <Comments reload={setRefresh} id={id} comment={book?.comentarios?.quantidade_comentarios || 0} type={2} />
            }
            <CommentSection>
                <CommentsContainer>
                    {
                        comments.map(item => <CommentsCard reload={setRefresh} key={item.id} type={2} comment={item} />)
                    }
                </CommentsContainer>
            </CommentSection>
            <Modal
                isOpen={isReportModalOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="report-modal-overlay"
                className="report-modal-content"
            >
                <ModalContentContainer>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h2>Reportar Obra</h2>
                    <ReportForm onSubmit={handleComplaint}>
                        <div>
                            {
                                complaintTypes?.map(item => <Complaints key={item.id} id={item.id} onChange={handleComplaintId} name={item.tipo}/>)
                            }
                        </div>
                        <textarea 
                            value={complaintDescription} 
                            onChange={e => setComplaintDescription(e.currentTarget.value)} 
                            required 
                            placeholder="Motivo da Denúncia"
                        />
                        <div>
                            <button onClick={handleCloseModal}>Cancelar</button>
                            <button className="submit" type="submit">Enviar</button>
                        </div>
                    </ReportForm> 
            </ModalContentContainer>
            </Modal>
        </Container>
    )
}