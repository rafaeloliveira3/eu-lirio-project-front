import { Container, NavBar, ListContainer, ListItem, CardsContainer, SelectContainer } from "./styles"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { defaultUrl } from "../../helpers/url"
import { Published } from "./Published"
import { Desactivated } from "./Desactivated"

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

    const [historyTypeSelector, setHistoryTypeSelector] = useState(1)

    const userId = localStorage.getItem('id')

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${userId}&currentUser=${userId}`)
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

    const handleSelectChange = (e) => {
        setHistoryTypeSelector(+e.currentTarget.value)
    }

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
            <SelectContainer>
                <select defaultValue="1" onChange={handleSelectChange}>
                    <option value="1">Livros</option>
                    <option value="2">Curtas</option>
                </select>
            </SelectContainer>
            <CardsContainer>
                {
                    (userClick) ? <Desactivated type={historyTypeSelector} user={user}/> : <Published type={historyTypeSelector} user={user}/>
                }
            </CardsContainer>
        </Container>
    )
}