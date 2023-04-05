import { Outlet, useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import { Container } from "./styles"

export const NewPost = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(true)
        setSearchbarDisplay(true)
        setFeedWidth(true)
    })

    return (
        <Container>
            <Outlet />
        </Container>
    )
}