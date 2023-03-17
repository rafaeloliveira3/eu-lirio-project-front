import { Outlet, useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import { Container } from "./styles"

export const NewPost = () => {
    const { setAdsDisplay, setSearchbarDisplay } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(true)
        setSearchbarDisplay(true)
    })

    return (
        <Container>
            <Outlet />
        </Container>
    )
}