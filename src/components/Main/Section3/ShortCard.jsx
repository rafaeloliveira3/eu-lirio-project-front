import { ShortCardStyle } from "./styles"

export const ShortCard = (props) => {
    return (
        <ShortCardStyle>
            <span>
                <h3>{props?.story?.titulo}</h3>
                <span>Um conto por: @{props.story?.usuario[0]?.user_name}</span>
            </span>
            <div>
                <img src={props.story?.capa} alt="" />
            </div>
        </ShortCardStyle>
    )
}