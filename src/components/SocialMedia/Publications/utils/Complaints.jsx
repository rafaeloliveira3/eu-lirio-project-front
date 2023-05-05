export const Complaints = (props) => {
    return (
        <>
            <input onChange={props.onChange} type="radio" name="complaint" id={props.id + "-radio"} value={props.id} />
            <label htmlFor={props.id + "-radio"}>{props.name}</label>
        </>
    )
}