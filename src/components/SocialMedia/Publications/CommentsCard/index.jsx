import axios from "axios";
import { useEffect, useState } from "react";
import { dateFormatter } from "../../../helpers/formatters";
import { ButtonExtras, Card, Container, ContentContainer, DeleteContainer, Overlay, UserContainer } from "./styles"
import { defaultUrl } from "../../../helpers/url";
import { Rating } from "react-simple-star-rating";
import Modal from "react-modal"
import { ModalContentContainer } from "../../Edit/styles";

export const CommentsCard = (props) => {
    const comment = props.comment
    const userId = localStorage.getItem('id')

    console.log(comment);

    const [spoiler, setSpoiler] = useState(false)
    const [user, setUser] = useState({})
    const [liked, setLiked] = useState(false)

    const [deleteModalOpener, setDeleteModalOpener] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [canDelete, setCanDelete] = useState(false)

    useEffect(() => {
        if (comment?.spoiler)
            setSpoiler(true)
        else 
            setSpoiler(false)

        const getUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${comment?.id_usuario}&currentUser=${userId}`)
            setUser(data?.data)
            if (toString(data?.data?.id) === toString(comment?.id_usuario))
                setCanDelete(true)
        }
        getUser()
    }, [comment.id, userId])

    const handleLike = async () => {
        const status = !liked
        setLiked(status)

        if(props.type === 1) {
            if (status) {
                await axios.post(`${defaultUrl}like-announcement-comment`, {
                    id_comentario : comment?.id,
                    id_usuario : userId
                })
            }
            else {
                await axios.delete(`${defaultUrl}dislike-announcement-comment?commentId=${comment?.id}&userId=${userId}`)
            }
        }
        else {

        }

        props.reload(true)
    }

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false)
    }

    const handleDeleteComment = async () => {
        let url

        if (props.type === 1) url = `delete-announcement-comment/id/?commentId=${comment?.id}&announcementId=${comment?.id_anuncio}`
        else url = `delete-announcement-comment/id/?commentId=${comment?.id}&announcementId=${comment?.id_anuncio}`

        await axios.delete(`${defaultUrl}${url}`)

        window.location.reload()
    }

    return (
        <Container >
            <Card>
                <UserContainer>
                    <div className="user-data">
                        <div>
                            <img src={user?.foto} alt="" />
                        </div>
                        <div className="rating-container">
                            <Rating 
                                onClick={() => {}} 
                                allowFraction 
                                readonly 
                                initialValue={comment?.avaliacao}
                                fillColor="var(--purple-dark)"
                                emptyStyle={{color:"#0000"}}
                                SVGstrokeColor="var(--purple-dark)"
                                SVGstorkeWidth={1}
                                size={20}
                                />
                            <span>@{user?.user_name}</span>
                        </div>
                    </div>
                    <div>
                        {canDelete ? <i onClick={() => setDeleteModalOpener(!deleteModalOpener)} className="fa-solid fa-ellipsis-vertical"></i> : <></>}
                        <DeleteContainer display={deleteModalOpener ? "block" : "none"}>
                            <span onClick={() => setIsDeleteModalOpen(true)}><i className="fa-solid fa-trash"></i> Excluir Comentário</span>
                        </DeleteContainer>
                    </div>
                </UserContainer>
                <ContentContainer>
                    <div className="text-container">
                        <h3>{comment?.titulo}</h3>
                        <p>{comment?.resenha}</p>
                    </div>
                    <div className="extras-container">
                        <div className="buttons-container">
                            <ButtonExtras onClick={handleLike} color="#F93E54"><i className={ liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i> 182</ButtonExtras>
                        </div>
                        <span>
                            {dateFormatter(comment?.data_publicado)}
                        </span>
                    </div>
                </ContentContainer>
            </Card>
            <Overlay theme={spoiler ? {display : 'flex'} : {display : 'none'}} onClick={() => setSpoiler(!spoiler)}>
                <i className="fa-solid fa-eye-slash"></i>
                <span>SPOILER</span>
            </Overlay>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="delete-modal-overlay"
                className="delete-modal-content"
            >
                <ModalContentContainer>
                    <i className="fa-solid fa-trash"></i>
                    <h2>Deseja mesmo excluir esse comentário?</h2>
                    <p>Essa ação é irreversível e resultará na exclusão completa deste comentário.</p>
                    <span>
                        <button className="cancelar" onClick={handleCloseModal}>Cancelar</button>
                        <button className="apagar" onClick={handleDeleteComment}>Apagar</button>
                    </span>
                </ModalContentContainer>
            </Modal>
        </Container>
    )
}