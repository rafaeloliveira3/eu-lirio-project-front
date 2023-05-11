import { defaultUrl } from "../../helpers/url"
import { useState, useEffect } from "react"
import axios from "axios"
import { ProfileHeader, UserMain, Filters, FilterItems, MainContainer, TagsContainer, Spacer, ModalContainer, UserCardsContainer } from "../Me/styles"
import { Bookmarks } from "../Me/Bookmarks"
import { Info } from "../Me/Info"
import { useParams, useOutletContext } from "react-router-dom"
import { Navigate } from 'react-router-dom'
import Modal from "react-modal"
import { UserCard } from "./UserCards/Card"

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

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)

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
        fetchUser()
    }, [id])
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
                    <button onClick={handleFollow}>
                        {
                            follow ? "SEGUINDO" : "SEGUIR" 
                        }
                    </button>
                </div>
                <div className="edit">
                    <span>
                        <h2>{user?.nome}</h2>
                        <h3>@{user?.user_name}</h3>
                    </span>
                    <Info obras={182} seguindo={570} seguindoModal={setIsFollowingModalOpen} seguidores={41 + ' K'} seguidoresModal={setIsFollowersModalOpen} />
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
                        <FilterItems>
                            <i className="fa-solid fa-book"></i>Livros
                        </FilterItems>
                        <FilterItems>
                            <i className="fa-solid fa-align-center"></i>Pequenas Histórias
                        </FilterItems>
                        <FilterItems>
                            <i className="fa-solid fa-book-open-reader"></i>Recomendações
                        </FilterItems>
                    </Filters>
                </div>
                <div className="posts">

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
        </MainContainer>
    )
}