import { Outlet, useOutletContext, Link } from "react-router-dom"
import { useEffect } from "react"
import { Container, Indicator, ListContainer, NavBar } from "./styles"
import { useState } from "react"

const indicatorActive = {
    color: "var(--purple-dark)"
}
const indicatorDesactivated = {
    color: "#0000"
}


export const Feed = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const indicatorBackup = [false, false, false]
    indicatorBackup[parseInt(sessionStorage.getItem('feed-index') || '0')] = true
    const [indicatorSetter, setIndicatorSetter] = useState(indicatorBackup)

    const handleLinkChange = (e) => {
        const id = e.currentTarget.id
        sessionStorage.setItem('feed-index', id)
        setIndicatorSetter(indicatorSetter.map((item, index) => {
            if (index === parseInt(sessionStorage.getItem('feed-index'))) {
                return true   
            }
            return false
        }))
    }

    return (
        <Container>
            <NavBar>
                <ListContainer>
                    <li>
                        <Link onClick={handleLinkChange} id={0} to="/app/feed/ebooks" >
                            <i className="fa-solid fa-book"></i>
                            Livros
                        </Link>
                        <Indicator theme={indicatorSetter[0] ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                    <li>
                        <Link onClick={handleLinkChange} id={1} to="/app/feed/shorts">
                            <i className="fa-solid fa-align-center"></i>
                            Pequenas Histórias
                        </Link>
                        <Indicator theme={indicatorSetter[1] ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                    <li>
                        <Link onClick={handleLinkChange} id={2} to="/app/feed/recomendations">
                            <i className="fa-solid fa-book-open-reader"></i>
                            Recomendações
                        </Link>
                        <Indicator theme={indicatorSetter[2] ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                </ListContainer>
            </NavBar>
            <Outlet />
        </Container>
    )
}