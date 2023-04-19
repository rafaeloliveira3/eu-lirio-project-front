import { UserCardStyled } from "./styles"

export const UserCard = (props) => {
    return (
        <UserCardStyled to={`/app/profile/${props?.user}`}>
            <div className="image-container">
                <img src={props?.photo} alt="" />
            </div>
            <div className="names-container">
                <p>{props?.name}</p>
                <span>@{props?.username}</span>
            </div>
        </UserCardStyled>
    )
}