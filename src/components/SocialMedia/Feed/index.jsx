import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"

export const Feed = () => {
    const { setAdsDisplay, setSearchbarDisplay } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
    })

    return (
        <h1>Feed</h1>
    )
}