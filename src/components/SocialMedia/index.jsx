import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { defaultUrl } from "../helpers/url"
import { Container, UserInfoContainer } from "./styles"

const SocialMedia = () => {
    const userToken = localStorage.getItem('token')
    const userId = localStorage.getItem('id')
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
    
            setUser(data.data.user[0])
        }
        fetchData()
    }, [userId])

    console.log(user);

    if (userToken === null) {
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