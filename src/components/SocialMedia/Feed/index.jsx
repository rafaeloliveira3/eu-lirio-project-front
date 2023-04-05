import { Outlet, useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import { Container, ListContainer, NavBar } from "./styles"

export const Feed = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    return (
        <Container>
            <NavBar>
                <ListContainer>
                    <li>
                        <i className="fa-solid fa-book"></i>
                        Livros
                    </li>
                    <li>
                        <i className="fa-solid fa-align-center"></i>
                        Curtas
                    </li>
                    <li>
                        <i className="fa-solid fa-book-open-reader"></i>
                        Recomendações
                    </li>
                </ListContainer>
            </NavBar>
            <Outlet />
        </Container>
    )
}