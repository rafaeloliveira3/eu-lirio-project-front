import { CheckboxStyled, LiStyled } from "./styles"

export const Checkbox = (props) => {
    return (
        <LiStyled>
            <CheckboxStyled onChange={props.onChange} type="checkbox" name="tags" id={`${props.type}-${props.id}`}/>
            <label htmlFor={`${props.type}-${props.id}`}>{props.name?.toUpperCase()}</label>
        </LiStyled>
    )
} 