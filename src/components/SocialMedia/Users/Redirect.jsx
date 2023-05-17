import { Navigate, useParams } from "react-router-dom"

export const Redirect = () => {
    const { id } = useParams() 

    return (
        <Navigate to={`/app/profile/${id}/ebooks`}/>
    )
}