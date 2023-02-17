import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const Step3 = () => {
    const location = useLocation()

    const step2result = location.state.user
    console.log(step2result);

    return (
        <h1>Step 3</h1>
    )
}