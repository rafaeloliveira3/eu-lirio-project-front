import { defaultUrl } from "../../helpers/url"
import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import axios from "axios"
import { FilterItems, Filters, MainContainer, ProfileHeader, Spacer, TagsContainer, UserMain } from "./styles"
import { Info } from "./Info"
import { Bookmarks } from "./Bookmarks"
import Modal from "react-modal"
import { UserCardsContainer, ModalContainer } from "./styles"
import { UserCard } from "../Users/UserCards/Card"
import { kFormatter } from "../../helpers/formatters"

export const Me = () => {

    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const userId = localStorage.getItem('id')
    const [user, setUser] = useState({})
    const [userTags, setUserTags] = useState([])
    const [userGenres, setUserGenres] = useState([])

    const [following, setFollowing] = useState([])
    const [followers, setFollowers] = useState([])

    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false)
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false)

    useEffect(() => {
        const fetchFollowing = async () => {
            const data = await axios.get(`${defaultUrl}following/user-id/?userId=${userId}&currentUser=${userId}`)
            .catch((err) => { 
                if (err?.request?.status === 404) {
                    setFollowing(false)
                }
            })
            if (data?.data)
                setFollowing(data?.data)
        }
        const fetchFollowers = async () => {
            const data = await axios.get(`${defaultUrl}followers/user-id/?userId=${userId}&currentUser=${userId}`)
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
    
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${userId}&currentUser=${userId}`)
            .catch((err) => { console.log(err) })

            console.log(data?.data);
    
            setUser(data?.data)
            setUserTags(data?.data.tags)
            setUserGenres(data?.data.generos)
        }
        fetchUser()
    }, [userId])

    return (
        <MainContainer>
            <ProfileHeader>
                <div className="user">
                    <img src={user?.foto} alt="" />
                    <Link to="/app/edit">
                        <button>EDITAR  PERFIL</button>
                    </Link>
                </div>
                <div className="edit">
                    <span>
                        <h2>{user?.nome}</h2>
                        <h3>@{user?.user_name}</h3>
                    </span>
                    <Info obras={kFormatter(parseInt(user?.obras?.total_obras || 0))} seguindo={kFormatter(parseInt(user?.qtde_seguindo?.quantidade_seguindo || 0))} seguidores={kFormatter(parseInt(user?.seguidores?.quantidade_seguidores || 0))} seguindoModal={setIsFollowingModalOpen} seguidoresModal={setIsFollowersModalOpen}/>
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