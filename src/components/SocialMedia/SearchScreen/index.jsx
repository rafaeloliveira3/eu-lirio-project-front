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

export const SearchScreen = () => {

    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()
    const [prompt, setPrompt] = useState("")

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const searchIndex = parseInt(sessionStorage.getItem('search-index'))
    const indicatorBackup = [false, false, false]
    indicatorBackup[parseInt(searchIndex || '0')] = true
    const [indicatorSetter, setIndicatorSetter] = useState(indicatorBackup)

    useEffect(() => {
        setIndicatorSetter(indicatorBackup)
    }, [searchIndex])


    const handleLinkChange = (e) => {
        const id = e.currentTarget.id
        sessionStorage.setItem('search-index', id)
        setIndicatorSetter(indicatorSetter.map((item, index) => {
            if (index === parseInt(sessionStorage.getItem('search-index'))) {
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
                        <Link onClick={handleLinkChange} id={0} to={`/app/search/announcements/${prompt}`} >
                            <i className="fa-solid fa-book"></i>
                            Livros
                        </Link>
                        <Indicator theme={indicatorSetter[0] ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                    <li>
                        <Link onClick={handleLinkChange} id={1} to={`/app/search/shorts/${prompt}`} >
                            <i className="fa-solid fa-align-center"></i>
                            Curtas
                        </Link>
                        <Indicator theme={indicatorSetter[1] ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                    <li>
                        <Link onClick={handleLinkChange} id={2} to={`/app/search/authors/${prompt}`}>
                            <i className="fa-solid fa-book-open-reader"></i>
                            Autores
                        </Link>
                        <Indicator theme={indicatorSetter[2] ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                </ListContainer>
            </NavBar>
            <Outlet context={ {setPrompt} } />
        </Container>
    )
}