import axios from "axios"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, Error, ExitContainer, FeedContainer, Links, NamesContainer, NewPost, OptContainer, PromotionContainer, Sair, SearchContainer, SearchContainerModal, TagsContainer, User, UserInfoContainer, UserOpt } from "./styles"
import logo from "../../assets/img/logo.svg"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Tags } from "./Tags"
import { Search } from "./Search"
import Modal from "react-modal"

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
    StyleBackup[parseInt(sessionStorage.getItem('index') || '0')] = true
    const [navBarStyleSetter, setNavBarStyleSetter] = useState(StyleBackup)

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

    const [adsDisplay, setAdsDisplay] = useState(false)
    const [searchbarDisplay, setSearchbarDisplay] = useState(false)
    const [feedWidth, setFeedWidth] = useState(false)
    const [tags, setTags] = useState([])

    const [searchPrompt, setSearchPrompt] = useState("")
    const [searched, setSearched] = useState([])
    const [searchError, setSearchError] = useState("Experimente digitar algo na barra de pesquisa")

    const handleLinkChange = (e) => {
        let id

        if (typeof(e) === "string") id = e
        else if (e === null) id = "0"
        else id = +e.currentTarget.id 

        sessionStorage.setItem('index', id)
        styleChanger()
    }
    const styleChanger = () => {
        const newArr = StyleBackup.map((item, index) => {
            if (index === parseInt(sessionStorage.getItem('index'))) {
                if (parseInt(sessionStorage.getItem('index')) === 0) {
                    sessionStorage.setItem('feed-index', 0)
                }
                return true
            }
            return false
        })
        setNavBarStyleSetter(newArr)
    }

    const navBarReseter = () => {
        setNavBarStyleSetter(StyleBackup.map((item) => {
            return false
        }))
        sessionStorage.setItem('index', -1)
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter') {
            navBarReseter()
            sessionStorage.setItem('search-index', '0')
            setIsSearchModalOpen(false)
            navigator(`/app/search/announcements/${searchPrompt}`)
        }
    }
    const handleClickSearch = () => {
        navBarReseter()
        sessionStorage.setItem('search-index', '0')
        setIsSearchModalOpen(false)
        navigator(`/app/search/announcements/${searchPrompt}`)
    }
    const handleCloseModal = () => {
        setIsSearchModalOpen(false)
    } 

    const useEffectHandler = sessionStorage.getItem('index')
    useEffect(() => {
        const id = sessionStorage.getItem('index')
        handleLinkChange(id)
    }, [useEffectHandler])

    const [user, setUser] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${userId}&currentUser=${userId}`)
            .catch((err) => { console.log(err) })
            setUser(data?.data)
            setTags(data?.data.tags)
        }
        fetchData()
    }, [userId])

    useEffect(() => {
        const searchByTitle = async () => {
            if (searchPrompt) {
                const data = await axios.post(`${defaultUrl}filter-announcements/?minValue=&maxValue=&userId=${userId}&bestRated=&announcementTitle=${searchPrompt}`, {
                    nome_genero : null
                })
                if (data?.data) {
                    setSearchError(false)
                }
    
                setSearched(data?.data?.filter((item, index) => {
                    return index <= 3
                }))
            }
            else {
                setSearchError("Experimente digitar algo na barra de pesquisa")
            }
        }
        searchByTitle()
    }, [searchPrompt])

    //if (userToken === null) {
    //    return <Navigate to="/login" />
    //}

    const exitApp = () => {
        exitSuccess()
        setTimeout(() => { 
            sessionStorage.setItem('index', '0')
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
                    <input type="text" onClick={() => setIsSearchModalOpen(true)} onKeyDown={handleEnterSearch} placeholder="Pesquisar" value={searchPrompt} onChange={(e) => {setSearchPrompt(e.currentTarget.value)}}/>
                    <i onClick={handleClickSearch} className="fa-solid fa-magnifying-glass"></i>
                    <Modal
                        isOpen={isSearchModalOpen}
                        onRequestClose={() => setIsSearchModalOpen(false)}
                        overlayClassName="search-modal-overlay"
                        className="search-modal-content"
                        shouldFocusAfterRender={false}
                    >
                        <SearchContainerModal>
                            {
                                searchError ? <Error>{searchError}</Error> : searched?.map(item => <Search key={item?.id} id={item?.id} closeModal={handleCloseModal} name={item?.titulo} search={searchPrompt} />)
                            }
                        </SearchContainerModal>
                    </Modal>
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
                                <span className="name">{user?.nome}</span>
                                <span className="userName">@{user?.user_name}</span>
                            </NamesContainer>
                            <TagsContainer>
                                {tags?.map(item => <Tags key={item.id_tag} name={item.nome_tag}/>)}
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
                                    <Links to="/app/favorites" onClick={handleLinkChange} theme={navBarStyleSetter[2] ? linkThemeActive : linkTheme} id="2">
                                        <i className="fa-solid fa-bookmark"></i>
                                        <span>FAVORITOS</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links to="/app/read" onClick={handleLinkChange} theme={navBarStyleSetter[3] ? linkThemeActive : linkTheme} id="3">
                                        <i className="fa-solid fa-check-circle"></i>
                                        <span>LIDOS</span>
                                    </Links>
                                </li>
                                <li>   
                                    <Links to="/app/library" onClick={handleLinkChange} theme={navBarStyleSetter[4] ? linkThemeActive : linkTheme} id="4">
                                        <i className="fa-solid fa-swatchbook"></i>
                                        <span>ESTANTE</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links to="/app/my-publications" onClick={handleLinkChange} theme={navBarStyleSetter[5] ? linkThemeActive : linkTheme} id="5">
                                        <i className="fa-solid fa-pen"></i>
                                        <span>MINHAS OBRAS</span>
                                    </Links>
                                </li>
                                <li>
                                    <Links to="/app/cart" onClick={handleLinkChange} theme={navBarStyleSetter[6] ? linkThemeActive : linkTheme} id="6">
                                        <i className="fa-solid fa-shopping-cart"></i>
                                        <span>CARRINHO</span>
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
            <ToastContainer position={toast.POSITION.TOP_CENTER} autoClose={4000} />
        </Container>
    )
}



export {
    SocialMedia
}