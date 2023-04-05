export const Options = (props) => {
    return (
        <option onChange={props.onChange} value={props.id}>{props.name}</option>
    )
}