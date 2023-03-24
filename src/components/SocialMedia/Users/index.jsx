import { defaultUrl } from "../../helpers/url"
import { useState, useEffect } from "react"
import axios from "axios"
import { Containers } from "../../utils/socialmedia"
import { ProfileHeader, UserMain } from "./styles"
import { Info } from "./Info"
import { useParams, useOutletContext } from "react-router-dom"
import { Error } from "./Error"

export const Users = () => {

    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    useEffect(() => {
        setAdsDisplay(false)
        setSearchbarDisplay(false)
        setFeedWidth(false)
    })

    const { id } = useParams()
    const [user, setUser] = useState({})
    const [userTags, setUserTags] = useState({})
    let image
    let biografia
    
    useEffect(() => {
        const fetchUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/${id}`)
            .catch((err) => { return err })

            if (data?.response?.status === 404) {
                setUser( {
                    error : true
                })
                return 
            }
    
            setUser(data.data.user[0])
        }
        const fetchTags = async () => {
            const data = await axios.get(`${defaultUrl}tags/id/${id}`)
            .catch((err) => { return err })

            if (data?.response?.status === 404) {
                setUserTags( {
                    error : true
                })
                return 
            }

            setUserTags(data.data.tags)
        }
        fetchUser()
        fetchTags()
    }, [id])

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
                    <button>SEGUIR</button>
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
            <Error error={user?.error}/>
        </Containers>
    )
}