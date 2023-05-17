import { defaultUrl } from "../../helpers/url"
import { useState, useEffect } from "react"
import axios from "axios"
import { ProfileHeader, UserMain, Filters, FilterItems, MainContainer, TagsContainer, Spacer, ModalContainer, UserCardsContainer, ReportContainer } from "../Me/styles"
import { Bookmarks } from "../Me/Bookmarks"
import { Info } from "../Me/Info"
import { useParams, useOutletContext, Outlet } from "react-router-dom"
import { Navigate } from 'react-router-dom'
import Modal from "react-modal"
import { UserCard } from "./UserCards/Card"
import { kFormatter } from "../../helpers/formatters"
import { ModalContentContainer, ReportForm } from "../Publications/Book/styles"
import { MESSAGE_SUCCESS } from "../../helpers/toasts"
import { Complaints } from "../Publications/utils/Complaints"

export const Users = () => {

    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const { id } = useParams()
    const [user, setUser] = useState({})
    const [userTags, setUserTags] = useState([])
    const [userGenres, setUserGenres] = useState([])

    const [follow, setFollow] = useState(false)

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    const [isReportModalOpen, setIsReportModalOpen] = useState(false)
    const [reportModalOpener, setReportModalOpener] = useState(false)

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)

    const [complaintTypes, setComplaintTypes] = useState([])
    const [complaintReason, setComplaintReason] = useState([])
    const [complaintDescription, setComplaintDescription] = useState("")


    const userId = localStorage.getItem('id')
    
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${id}&currentUser=${userId}`)
            .catch((err) => { console.log(err) })
            
            if (data?.data?.seguindo)
                setFollow(true)
            else
                setFollow(false)

            setUser(data?.data)
            setUserTags(data?.data.tags)
            setUserGenres(data?.data.generos)
        }
        const getComplaints = async () => {
            const data = await axios.get(`${defaultUrl}complaint-types`)
            setComplaintTypes(data?.data)
        }
        fetchUser()
        getComplaints()
    }, [id, follow])
    useEffect(() => {
        const fetchFollowing = async () => {
            const data = await axios.get(`${defaultUrl}following/user-id/?userId=${id}&currentUser=${userId}`)
            .catch((err) => { 
                if (err?.request?.status === 404) {
                    setFollowing(false)
                }
            })
            if (data?.data)
                setFollowing(data?.data)
        }
        const fetchFollowers = async () => {
            const data = await axios.get(`${defaultUrl}followers/user-id/?userId=${id}&currentUser=${userId}`)
            .catch((err) => { 
                if (err?.request?.status === 404) {
                    setFollowers(false)
                }
            })
            if (data?.data)
                setFollowers(data?.data)
        }
        
        if (isFollowingModalOpen) {
            fetchFollowing()
        }
        if (isFollowersModalOpen) {
            fetchFollowers()
        }
    }, [isFollowingModalOpen, isFollowersModalOpen])

    const handleFollow = async () => {
        const status = !follow
        setFollow(status)
        if (status) {
            await axios.post(`${defaultUrl}follow-user`, {
                id_segue : userId,
                id_seguindo : id
            })
        }
        else {
            await axios.delete(`${defaultUrl}unfollow-user/?followerId=${userId}&followedId=${id}`)
        }
    }

    const handleComplaint = async (e) => {
        e.preventDefault()

        const complaintType = complaintReason.map(item => {
            return {
                id_tipo_denuncia : item
            }
        })
        await axios.post(`${defaultUrl}report-user/${userId}`, {
            descricao : complaintDescription,
            id_usuario : id,
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
    const handleCloseModal = () => {
        setIsReportModalOpen(false)
    }

    if (id === userId) {
        return (
            <Navigate to='/app/me' />
        )
    }
    return (
        <MainContainer>
            <ProfileHeader>
                <div className="user">
                    <img src={user?.foto} alt="" />
                    <div className="extras-container">
                        <i className="fa-solid fa-ellipsis-vertical" onClick={() => setReportModalOpener(!reportModalOpener)}></i>
                        <ReportContainer display={reportModalOpener ? "block" : "none"}>
                            <span onClick={() => setIsReportModalOpen(true)}><i className="fa-solid fa-circle-exclamation"></i>Denunciar Usuário</span>
                        </ReportContainer>
                        <div className="follow">
                            {
                                user?.te_segue ? <p>Segue Você</p> : <></> 
                            }
                            <button onClick={handleFollow}>
                                {
                                    follow ? "SEGUINDO" : "SEGUIR" 
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="edit">
                    <span>
                        <h2>{user?.nome}</h2>
                        <h3>@{user?.user_name}</h3>
                    </span>
                    <Info obras={kFormatter(parseInt(user?.obras?.total_obras || 0))} seguindo={kFormatter(parseInt(user?.qtde_seguindo?.quantidade_seguindo || 0))} seguindoModal={setIsFollowingModalOpen} seguidores={kFormatter(parseInt(user?.seguidores?.quantidade_seguidores || 0))} seguidoresModal={setIsFollowersModalOpen} />
                </div>
            </ProfileHeader>
            <UserMain>
                <div className="text">
                    <div className="biography">
                        {user?.biografia}
                    </div>
                    <TagsContainer>
                        <Bookmarks tags={userTags} genres={userGenres}/>
                    </TagsContainer>
                    <Spacer></Spacer>
                    <Filters>
                        <FilterItems to={`/app/profile/${id}/ebooks`}>
                            <i className="fa-solid fa-book"></i>Livros
                        </FilterItems>
                        <FilterItems to={`/app/profile/${id}/shorts`}>
                            <i className="fa-solid fa-align-center"></i>Pequenas Histórias
                        </FilterItems>
                        <FilterItems to={`/app/profile/${id}/recomendations`}>
                            <i className="fa-solid fa-book-open-reader"></i>Recomendações
                        </FilterItems>
                    </Filters>
                </div>
                <div className="posts">
                    <Outlet context={ {user} }/>
                </div>
            </UserMain>
            <Modal
                isOpen={isFollowingModalOpen}
                onRequestClose={() => {setIsFollowingModalOpen(false)}}
                overlayClassName="following-modal-overlay"
                className="following-modal-content"
            >
                <ModalContainer>
                    <div className="info-container">
                        <h2>Perfis que {user?.nome} segue:</h2>
                        <button onClick={() => {setIsFollowingModalOpen(false)}}><i className="fa-solid fa-x"></i></button>
                    </div>
                    <UserCardsContainer>
                        {
                            following ? following?.map((item) => <UserCard modalDisplay={setIsFollowingModalOpen} key={item.id} id={item.id} />) : <h2>Parece que esse perfil não segue ninguém</h2>
                        }
                    </UserCardsContainer>
                </ModalContainer>
            </Modal>
            <Modal
                isOpen={isFollowersModalOpen}
                onRequestClose={() => {setIsFollowersModalOpen(false)}}
                overlayClassName="following-modal-overlay"
                className="following-modal-content"
            >
                <ModalContainer>
                    <div className="info-container">
                        <h2>Perfis que seguem {user?.nome}:</h2>
                        <button onClick={() => {setIsFollowersModalOpen(false)}}><i className="fa-solid fa-x"></i></button>
                    </div>
                    <UserCardsContainer>
                        {
                            followers ? followers?.map((item) => <UserCard modalDisplay={setIsFollowersModalOpen} key={item.id} id={item.id} />) : <h2>Parece que ninguém segue esse perfil</h2>
                        }
                    </UserCardsContainer>
                </ModalContainer>
            </Modal>
            <Modal
                isOpen={isReportModalOpen}
                onRequestClose={handleCloseModal}
                overlayClassName="report-modal-overlay"
                className="report-modal-content"
            >
                <ModalContentContainer>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h2>Reportar Usuário</h2>
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
        </MainContainer>
    )
}