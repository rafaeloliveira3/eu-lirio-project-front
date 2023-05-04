import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { ItemContainer } from "./styles"
import { useNavigate } from "react-router-dom"

const follow = {
    bgColor: '#0000;',
    color: 'var(--font-color);'
}
const following = {
    bgColor: 'var(--font-color);',
    color: '#fff;'
}

export const UserCard = (props) => {
    const navigate = useNavigate()
    const [author, setAuthor] = useState({})
    const [followStatus, setFollowStatus] = useState(false)
    const userId = localStorage.getItem('id')
    const [blockFollow, setBlockFollow] = useState(false)

    useEffect(() => {
        const getAuthor = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${props.id}&currentUser=${userId}`)
            .catch(err => console.log(err))

            
            if (String(props.id) === userId)
                setBlockFollow(true)
        
            setAuthor(data?.data)
        }
        getAuthor()
    }, [props.id, followStatus])
    
    const handleClick = (e) => {
        const id = e.currentTarget.id
        navigate(`/app/profile/${id}`)
    }

    const handleFollow = async (e) => {
        e.stopPropagation()
        const status = !follow
        setFollowStatus(status)

        if (status) {
            await axios.post(`${defaultUrl}follow-user`, {
                id_segue : userId,
                id_seguindo : props.id
            })
        }
        else {
            await axios.delete(`${defaultUrl}unfollow-user/?followerId=${userId}&followedId=${props.id}`)
        }
    }

    return (
        <ItemContainer theme={followStatus ? following : follow} id={author?.id} onClick={handleClick}>
            <div className="user-data">
                <div className="image-container">
                    <img src={author?.foto} alt="" />   
                </div>
                <span className="names-container">
                    <p className="name">{author?.nome}</p>
                    <p className="user-name">@{author?.user_name}</p>
                </span>
            </div>
            <div className="user-extras">
                <button disabled={blockFollow} onClick={handleFollow} className="follow-button">{followStatus ? "SEGUINDO" : "SEGUIR"}</button>
            </div>
        </ItemContainer>
    )
}