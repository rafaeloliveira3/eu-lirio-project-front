import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, UserInfoContainer } from "./styles"

const SocialMedia = () => {
    const userToken = localStorage.getItem('token')

    const userId = localStorage.getItem('id')
    const [user, setUser] = useState({})
    
    useEffect(() => {
        fetch(`${defaultUrl}user/id/${userId}`)
        .then(response => response.json())
        .then(data => setUser(data.user[0]))
        .catch((e) => { console.log(e) })
    }, [])

    console.log(user);

    if (!userToken) {
        return <Navigate to="/login" />
    }

    return (
        <Container>
            <UserInfoContainer>
                <h1>{user.nome}</h1>
                <span>@{user.user_name}</span>
            </UserInfoContainer>
            <div>

            </div>
            <div>

            </div>
        </Container>
    )
}



export {
    SocialMedia
}