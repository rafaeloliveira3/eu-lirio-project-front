import { useOutletContext, Link } from "react-router-dom"
import { useEffect } from "react"
import { Container, Indicator, ListContainer, NavBar } from "./styles"
import { useState } from "react"
import { Ebooks } from "./Ebooks"
import { Shorts } from "./Shorts"

const indicatorActive = {
    color: "var(--purple-dark)"
}
const indicatorDesactivated = {
    color: "#0000"
}


export const Readed = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const [indicatorSetter, setIndicatorSetter] = useState(false)

    const handleLinkChange = (e) => {
        setIndicatorSetter(!indicatorSetter)
    }

    return (
        <Container>
            <NavBar>
                <ListContainer>
                    <li>
                        <div onClick={handleLinkChange} className="indicator" >
                            <i className="fa-solid fa-book"></i>
                            Livros
                        </div>
                        <Indicator theme={indicatorSetter ? indicatorDesactivated : indicatorActive }></Indicator>
                    </li>
                    <li>
                        <div onClick={handleLinkChange} className="indicator" >
                            <i className="fa-solid fa-align-center"></i>
                            Curtas
                        </div>
                        <Indicator theme={indicatorSetter ? indicatorActive : indicatorDesactivated }></Indicator>
                    </li>
                </ListContainer>
            </NavBar>
            {
                (indicatorSetter) ? <Shorts /> : <Ebooks /> 
            }
        </Container>
    )
}
