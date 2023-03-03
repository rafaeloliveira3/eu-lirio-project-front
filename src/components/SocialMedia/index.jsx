import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, ExitContainer, FeedContainer, Links, PromotionContainer, Sair, User, UserInfoContainer, UserOpt } from "./styles"

const SocialMedia = () => {
    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('id')
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

    if (user.foto === 'undefined')
        image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    else 
        image = user.foto 

    if (userToken === null) {
        return <Navigate to="/login" />
    }

    return (
        <Container>
            <UserInfoContainer>
                <User>
                    <img src={image} alt="" />
                    <div>
                        <span className="name">{user.nome}</span>
                        <span className="userName">@{user.user_name}</span>
                    </div>
                </User>
                <UserOpt>
                    <ul>
                        <li>
                            <Links>
                                <i className="fa-solid fa-spa"></i>
                                <span>HOME</span>
                            </Links>
                        </li>
                        <li>
                            <Links to="/app/me">
                                <i className="fa-solid fa-user"></i>
                                <span>MEU PERFIL</span>
                            </Links>
                        </li>
                        <li>
                            <Links>
                                <i class="fa-solid fa-bookmark"></i>
                                <span>FAVORITOS</span>
                            </Links>
                        </li>
                        <li>
                            <Links>
                                <i className="fa-solid fa-check-circle"></i>
                                <span>LIDOS</span>
                            </Links>
                        </li>
                        <li>   
                            <Links>
                                <i className="fa-solid fa-shopping-bag"></i>
                                <span>MEUS E-BOOKS</span>
                            </Links>
                        </li>
                        <li>
                            <Links>
                                <i className="fa-solid fa-crown"></i>
                                <span>LÍRIO PLUS</span>
                            </Links>
                        </li>
                        <li>
                            <Links to="/app/edit">
                                <i className="fa-solid fa-user-edit"></i>
                                <span>EDITAR PERFIL</span>
                            </Links>
                        </li>
                    </ul>
                </UserOpt>
                <ExitContainer>
                    <Sair>
                        <i class="fa-solid fa-sign-out"></i>
                        SAIR
                    </Sair>
                </ExitContainer>
            </UserInfoContainer>
            <FeedContainer>
                <Outlet />
            </FeedContainer>
            <PromotionContainer>

            </PromotionContainer>
        </Container>
    )
}



export {
    SocialMedia
}