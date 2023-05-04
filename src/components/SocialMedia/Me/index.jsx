import { defaultUrl } from "../../helpers/url"
import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import axios from "axios"
import { Containers } from "../../utils/socialmedia"
import { FilterItems, Filters, MainContainer, ProfileHeader, Spacer, TagsContainer, UserMain } from "./styles"
import { Info } from "./Info"
import { Bookmarks } from "./Bookmarks"

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
    
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${userId}&currentUser=${userId}`)
            .catch((err) => { console.log(err) })
    
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
                    <Info obras={182} seguindo={570} seguidores={41 + ' K'}/>
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
        </MainContainer>
    )
}