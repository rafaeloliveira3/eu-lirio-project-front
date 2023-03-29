import { Container, NavBar, ListContainer, ListItem } from "./styles"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { defaultUrl } from "../../helpers/url"
import { Published } from "./Published"

const selected = {
    bottom_color: 'var(--purple-dark)'
}
const notSelected = {
    bottom_color: '#0000'
}


export const UserPublications = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    const [userClick, setUserClick] = useState(false)
    const [user, setUser] = useState({})

    const userId = localStorage.getItem('id')

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
            setUser(data?.data)
        }
        fetchData()
    }, [userId])

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    return (
        <Container>
            <NavBar>
                <ListContainer>
                    <ListItem theme={userClick ? notSelected : selected} onClick={() => {
                        setUserClick(false)
                    }}>
                        <h3>Publicadas</h3>
                        <div></div>
                    </ListItem>
                    <ListItem theme={userClick ? selected : notSelected} onClick={() => {
                        setUserClick(true)
                    }}>   
                        <h3>Desativadas</h3>
                        <div></div>
                    </ListItem>
                </ListContainer>
            </NavBar>
            {
                (userClick) ? <h1>tem</h1> : <Published user={user}/>
            }
        </Container>
    )
}