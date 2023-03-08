import { CheckboxStyled, LiStyled } from "./styles"

export const Checkbox = (props, index) => {
    return (
        <LiStyled>
            <CheckboxStyled type="checkbox" name="tags" id={props.name}/>
            <label htmlFor={props.name}>{props.name.toUpperCase()}</label>
        </LiStyled>
    )
} 