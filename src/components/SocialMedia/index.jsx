import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, ExitContainer, FeedContainer, Links, NamesContainer, NewPost, OptContainer, PromotionContainer, Sair, SearchContainer, TagsContainer, User, UserInfoContainer, UserOpt } from "./styles"
import logo from "../../assets/img/logo.svg"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Tags } from "./Tags"

let linkTheme = {
    font: "var(--font-color)",
    icon: "1.5px var(--font-color)",
    icon_color: "#0000",
    weight: "500"
}
let linkThemeActive = {
    font: "var(--purple-dark)",
    icon: "none",
    icon_color: "var(--purple-dark)",
    weight: "700"
}

let feedMax = {
    width : "100%"
}
let feedMin = {
    width : "50%"
}

let visibleDisplay = {
    display: "flex"
}
let invisibleDisplay = {
    display: "none"
}


const SocialMedia = () => {
    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('id')

    const navigator = useNavigate()
    const exitSuccess = () => toast.success('Usuário deslogado com Sucesso!')

    const StyleBackup = new Array(7).fill(false)
    StyleBackup[0] = true
    const [navBarStyleSetter, setNavBarStyleSetter] = useState(StyleBackup)

    const [adsDisplay, setAdsDisplay] = useState(false)
    const [searchbarDisplay, setSearchbarDisplay] = useState(false)
    const [feedWidth, setFeedWidth] = useState(false)
    const [tags, setTags] = useState([])


    const handleLinkChange = (e) => {
        const id = +e.currentTarget.id
        const newArr = StyleBackup.map((item, index) => {
            if (index === id) {
                return true
            }
            else {
                return false
            }
        })
        setNavBarStyleSetter(newArr)
    }
    const navBarReseter = () => {
        setNavBarStyleSetter(StyleBackup.map((item, index) => {
            if (index === 0) {
                return false
            }
            else return item
        }))
    }

    const [user, setUser] = useState({})
    let image
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
    
            setUser(data?.data)
            setTags(data?.data.tags)
        }
        fetchData()
    }, [userId])

    //if (userToken === null) {
    //    return <Navigate to="/login" />
    //}

    const exitApp = () => {
        exitSuccess()
        setTimeout(() => { 
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            navigator('/login') 
        }, 2500) 
    }


    return (
        <Container>
            <header className="app-header">
                <div>
                    <img src={logo} alt="" />
                </div>
                <SearchContainer className="search" theme={searchbarDisplay ? invisibleDisplay : visibleDisplay}>
                    <input type="text" placeholder="Pesquisar" name="" id="" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </SearchContainer>
                <div className="fixer">

                </div>
            </header>
            <div className="user-area-container">
                <UserInfoContainer>
                    <User>
                        <img src={user?.foto} alt="" />
                        <div className="user-info">
                            <NamesContainer>
                                <span className="name">{user.nome}</span>
                                <span className="userName">@{user.user_name}</span>
                            </NamesContainer>
                            <TagsContainer>
                                {tags?.map(item => <Tags key={item.id} name={item.tag}/>)}
                            </TagsContainer>
                        </div>
                    </User>
                    <OptContainer>
                        <UserOpt selected={navBarStyleSetter}>
                            <ul id="items-container">
                                <li>
                                    <Links to="/app/feed" onClick={handleLinkChange} theme={navBarStyleSetter[0] ? linkThemeActive : linkTheme} id="0">
                                        <i className="fa-solid fa-spa"></i>
                                        <span>HOME</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links to="/app/me" onClick={handleLinkChange} theme={navBarStyleSetter[1] ? linkThemeActive : linkTheme} id="1">
                                        <i className="fa-solid fa-user"></i>
                                        <span>MEU PERFIL</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links onClick={handleLinkChange} theme={navBarStyleSetter[2] ? linkThemeActive : linkTheme} id="2">
                                        <i className="fa-solid fa-bookmark"></i>
                                        <span>FAVORITOS</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links onClick={handleLinkChange} theme={navBarStyleSetter[3] ? linkThemeActive : linkTheme} id="3">
                                        <i className="fa-solid fa-check-circle"></i>
                                        <span>LIDOS</span>
                                    </Links>
                                </li>
                                <li>   
                                    <Links onClick={handleLinkChange} theme={navBarStyleSetter[4] ? linkThemeActive : linkTheme} id="4">
                                        <i className="fa-solid fa-shopping-bag"></i>
                                        <span>MEUS E-BOOKS</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links onClick={handleLinkChange} theme={navBarStyleSetter[6] ? linkThemeActive : linkTheme} id="6">
                                        <i className="fa-solid fa-shopping-cart"></i>
                                        <span>CARRINHO</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links onClick={handleLinkChange} theme={navBarStyleSetter[5] ? linkThemeActive : linkTheme} id="5">
                                        <i className="fa-solid fa-crown"></i>
                                        <span>LÍRIO PLUS</span>
                                    </Links>
                                </li>
                            </ul>
                        </UserOpt>
                        <NewPost to="/app/new/choose">
                            <button onClick={navBarReseter}>
                                NOVA PUBLICAÇÃO
                            </button>
                        </NewPost>
                    </OptContainer>
                    <ExitContainer>
                        <Sair onClick={exitApp}>
                            <i className="fa-solid fa-sign-out"></i>
                            SAIR
                        </Sair>
                    </ExitContainer>
                </UserInfoContainer>
                <FeedContainer theme={feedWidth ? feedMax : feedMin}>
                    <Outlet context={ {setAdsDisplay, setSearchbarDisplay, setFeedWidth} }/>
                </FeedContainer>
                <PromotionContainer theme={adsDisplay ? invisibleDisplay : visibleDisplay}>

                </PromotionContainer>
            </div>
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={false} />
        </Container>
    )
}



export {
    SocialMedia
}