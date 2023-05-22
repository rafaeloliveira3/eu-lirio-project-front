import { CheckBox, Container, Label } from "./styles";

const GenderCheck = (props) => {
    console.log(props);

    return (
        <Container>
            <CheckBox id={props?.id} type="checkbox" onChange={props?.onChange}></CheckBox>
            <Label htmlFor={props?.id}>{props?.nome} <div><i className="fa-solid fa-check"></i></div></Label>
        </Container>
    )
}

export {
    GenderCheck
}