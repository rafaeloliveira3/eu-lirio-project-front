import { useOutletContext } from "react-router-dom"
import { useEffect } from "react"

export const NewPost = () => {
    const { setAdsDisplay } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(true)
    })

    return (
        <h1>Hello World</h1>
    )
}