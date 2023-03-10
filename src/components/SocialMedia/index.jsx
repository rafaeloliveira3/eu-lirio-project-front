import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, ExitContainer, FeedContainer, Links, PromotionContainer, Sair, User, UserInfoContainer, UserOpt } from "./styles"
import logo from "../../assets/img/logo.svg"

const SocialMedia = () => {
    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('id')

    const [navBarStyleSetter, setNavBarStyleSetter] = useState("")
    


    const handleLinkChange = (e) => {
        const id = +e.currentTarget.id
        setNavBarStyleSetter(id.toString())
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
                        <ul>
                            <li>
                                <Links onClick={handleLinkChange} id="0">
                                    <i className="fa-solid fa-spa"></i>
                                    <span>HOME</span>
                                </Links>
                            </li>
                            <li>
                                <Links to="/app/me" onClick={handleLinkChange} id="1">
                                    <i className="fa-solid fa-user"></i>
                                    <span>MEU PERFIL</span>
                                </Links>
                            </li>
                            <li>
                                <Links onClick={handleLinkChange} id="2">
                                    <i className="fa-solid fa-bookmark"></i>
                                    <span>FAVORITOS</span>
                                </Links>
                            </li>
                            <li>
                                <Links onClick={handleLinkChange} id="3">
                                    <i className="fa-solid fa-check-circle"></i>
                                    <span>LIDOS</span>
                                </Links>
                            </li>
                            <li>   
                                <Links onClick={handleLinkChange} id="4">
                                    <i className="fa-solid fa-shopping-bag"></i>
                                    <span>MEUS E-BOOKS</span>
                                </Links>
                            </li>
                            <li>
                                <Links onClick={handleLinkChange} id="5">
                                    <i className="fa-solid fa-crown"></i>
                                    <span>LÍRIO PLUS</span>
                                </Links>
                            </li>
                            <li>
                                <Links to="/app/edit" onClick={handleLinkChange} id="6">
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