import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { ItemContainer } from "./styles"
import { useNavigate } from "react-router-dom"
import { Genres } from "../../Feed/Cards/Genres"

const follow = {
    bgColor: '#0000;',
    color: 'var(--font-color);'
}
const following = {
    bgColor: 'var(--font-color);',
    color: '#fff;'
}

export const AuthorCard = (props) => {
    const navigate = useNavigate()
    const [author, setAuthor] = useState({})
    const [followStatus, setFollowStatus] = useState(false)
    const [canFollow, setCanFollow] = useState(true)
    const userId = localStorage.getItem('id')

    useEffect(() => {
        const getAuthor = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${props.id}&currentUser=${userId}`)
            .catch(err => console.log(err))

            if (data?.data.id === userId)
                setCanFollow(false)
            if (data?.data?.seguindo)
                setFollowStatus(true)

            setAuthor(data?.data)
        }
        getAuthor()
    }, [props.id, userId])
    
    const handleClick = (e) => {
        const id = e.currentTarget.id
        navigate(`/app/profile/${id}`)
    }
    const handleFollow = async (e) => {
        e.stopPropagation()
        const status = !followStatus
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
                <div className="genres">
                    {
                        author?.generos?.map(item => <Genres key={item.id_genero} name={item.nome_genero} />)
                    }
                </div>
                <div className="follow">
                    {
                        author?.te_segue ? <p>Segue Você</p> : <></>
                    }
                    <button onClick={handleFollow} disabled={!canFollow} className="follow-button">{followStatus ? "SEGUINDO" : "SEGUIR"}</button>
                </div>
            </div>
        </ItemContainer>
    )
}