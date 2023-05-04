import { InfoStyle } from "./styles"

export const Info = (props) => {
    return (
        <InfoStyle>
            <div>
                <span>
                    {props.obras}
                </span>
                <p>OBRAS</p>
            </div>
            <div onClick={() => {props.seguindoModal(true)}}>
                <span>
                    {props.seguindo}
                </span>
                <p>SEGUINDO</p>
            </div>
            <div onClick={() => {props.seguidoresModal(true)}}>
                <span>
                    {props.seguidores}
                </span>
                <p>SEGUIDORES</p>
            </div>
        </InfoStyle>
    )
}