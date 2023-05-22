import { Arrow } from "./styles";

export const Arrows = (props) => {
    return (
        <Arrow
            className={props.className}
            style={{ ...props.style, display: "block" }}
            onClick={props.onClick}
        >
            <i className={`fa-solid fa-angle-${props.side}`}></i>
        </Arrow>
    )
}