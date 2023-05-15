import { CheckboxStyled } from "./styles"

export const Complaints = (props) => {
    return (
        <span>
            <CheckboxStyled onChange={props.onChange} type="checkbox" name="complaint" id={props.id + "-radio"} value={props.id} />
            <label htmlFor={props.id + "-radio"}>{props.name}</label>
        </span>
    )
}