import { defaultUrl } from "../../helpers/url"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { Containers } from "../../utils/socialmedia"
import { ProfileHeader, UserMain } from "./styles"
import { Info } from "./Info"

export const Me = () => {
    const userId = localStorage.getItem('id')
    const [user, setUser] = useState({})
    const [userTags, setUserTags] = useState({})
    let image
    let biografia
    
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${userId}`)
            .catch((err) => { console.log(err) })
            console.log(data);
    
            setUser(data.data.user[0])
        }
        const fetchTags = async () => {
            const data = await axios.get(`${defaultUrl}tags/id/${userId}`)
            .catch((err) => { console.log(err) })

            setUserTags(data.data.tags)
        }
        fetchUser()
        fetchTags()
    }, [userId])

    console.log(user.foto);

    if (user.foto === undefined || user.foto === null)
        image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    else 
        image = user.foto

    if (user.biografia === 'undefined')
        biografia = 'Nada Informado'
    else 
        biografia = user.biografia

    return (
        <Containers>
            <ProfileHeader>
                <div className="user">
                    <img src={image} alt="" />
                    <Link to="/app/edit">
                        <button>EDITAR  PERFIL</button>
                    </Link>
                </div>
                <div className="edit">
                    <span>
                        <h2>{user.nome}</h2>
                        <h3>@{user.user_name}</h3>
                    </span>
                    <Info obras={182} seguindo={570} seguidores={41 + ' K'}/>
                </div>
            </ProfileHeader>
            <UserMain>
                <div className="text">
                    <div className="biography">
                        {biografia}
                    </div>
                    <div className="tags">
                        <div className="type">

                        </div>
                        <div className="genders">

                        </div>
                    </div>
                    <div className="filters">

                    </div>
                </div>
                <div className="posts">

                </div>
            </UserMain>
        </Containers>
    )
}