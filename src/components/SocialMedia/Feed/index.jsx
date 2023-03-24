import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"

export const Feed = () => {
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    return (
        <h1>Feed</h1>
    )
}