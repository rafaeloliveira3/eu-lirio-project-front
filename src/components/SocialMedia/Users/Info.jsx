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
            <div>
                <span>
                    {props.seguindo}
                </span>
                <p>SEGUINDO</p>
            </div>
            <div>
                <span>
                    {props.seguidores}
                </span>
                <p>SEGUIDORES</p>
            </div>
        </InfoStyle>
    )
}