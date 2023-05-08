import axios from "axios";
import { useEffect, useState } from "react";
import { dateFormatter } from "../../../helpers/formatters";
import { Card, Container, ContentContainer, Overlay, UserContainer } from "./styles"
import { defaultUrl } from "../../../helpers/url";
import { Rating } from "react-simple-star-rating";

export const CommentsCard = (props) => {
    const comment = props.comment
    const userId = localStorage.getItem('id')
    console.log(comment)

    const [spoiler, setSpoiler] = useState(false)
    const [user, setUser] = useState({})

    useEffect(() => {
        if (comment?.spoiler)
            setSpoiler(true)
        else 
            setSpoiler(false)

        const getUser = async () => {
            const data = await axios.get(`${defaultUrl}user/id/?searchUser=${comment?.id_usuario}&currentUser=${userId}`)
            setUser(data?.data)
        }
        getUser()
    }, [comment.id, userId])

    return (
        <Container >
            <Card>
                <UserContainer>
                    <div className="user-data">
                        <div>
                            <img src={user?.foto} alt="" />
                        </div>
                        <div className="rating-container">
                            <Rating 
                                onClick={() => {}} 
                                allowFraction 
                                readonly 
                                initialValue={comment?.avaliacao}
                                fillColor="var(--purple-dark)"
                                emptyStyle={{color:"#0000"}}
                                SVGstrokeColor="var(--purple-dark)"
                                SVGstorkeWidth={1}
                                size={20}
                                />
                            <span>@{user?.user_name}</span>
                        </div>
                    </div>
                    <div>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </UserContainer>
                <ContentContainer>
                    <div className="text-container">
                        <h3>{comment?.titulo}</h3>
                        <p>{comment?.resenha}</p>
                    </div>
                    <div className="extras-container">
                        <div>
                            <button>Teste</button>
                            <button>TEste</button>
                        </div>
                        <span>
                            {dateFormatter(comment?.data_publicado)}
                        </span>
                    </div>
                </ContentContainer>
            </Card>
            <Overlay theme={spoiler ? {display : 'flex'} : {display : 'none'}} onClick={() => setSpoiler(!spoiler)}>
                <i className="fa-solid fa-eye-slash"></i>
                <span>SPOILER</span>
            </Overlay>
        </Container>
    )
}