import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, ExitContainer, FeedContainer, Links, PromotionContainer, Sair, User, UserInfoContainer, UserOpt } from "./styles"
import logo from "../../assets/img/logo.svg"

let linkTheme = {
    font: "var(--font-color)",
    icon: "2px var(--font-color)",
    icon_color: "#0000",
    weight: "500"
}
let linkThemeActive = {
    font: "var(--purple-dark)",
    icon: "none",
    icon_color: "var(--purple-dark)",
    weight: "700"
}


const SocialMedia = () => {
    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('id')

    const StyleBackup = new Array(7).fill(false)
    const [navBarStyleSetter, setNavBarStyleSetter] = useState(StyleBackup)


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

    const [user, setUser] = useState({})
    let image
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
    
            setUser(data.data.user[0])
        }
        fetchData()
    }, [userId])

    if (user.foto === 'undefined' || user.foto == null)
        image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    else 
        image = user.foto 

    if (userToken === null) {
        return <Navigate to="/login" />
    }


    return (
        <Container>
            <header className="app-header">
                <img src={logo} alt="" />
            </header>
            <div className="user-area-container">
                <UserInfoContainer>
                    <User>
                        <img src={image} alt="" />
                        <div>
                            <span className="name">{user.nome}</span>
                            <span className="userName">@{user.user_name}</span>
                        </div>
                    </User>
                    <UserOpt selected={navBarStyleSetter}>
                        <ul id="items-container">
                            <li>
                                <Links onClick={handleLinkChange} theme={navBarStyleSetter[0] ? linkThemeActive : linkTheme} id="0">
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
                                <Links onClick={handleLinkChange} theme={navBarStyleSetter[5] ? linkThemeActive : linkTheme} id="5">
                                    <i className="fa-solid fa-crown"></i>
                                    <span>LÍRIO PLUS</span>
                                </Links>
                            </li>
                            <li>
                                <Links to="/app/edit" onClick={handleLinkChange} theme={navBarStyleSetter[6] ? linkThemeActive : linkTheme} id="6">
                                    <i className="fa-solid fa-user-edit"></i>
                                    <span>EDITAR PERFIL</span>
                                </Links>
                            </li>
                        </ul>
                    </UserOpt>
                    <ExitContainer>
                        <Sair>
                            <i className="fa-solid fa-sign-out"></i>
                            SAIR
                        </Sair>
                    </ExitContainer>
                </UserInfoContainer>
                <FeedContainer>
                    <Outlet />
                </FeedContainer>
                <PromotionContainer>

                </PromotionContainer>
            </div>
        </Container>
    )
}



export {
    SocialMedia
}