import { CheckBox, Container, Label } from "./styles";

const GenderCheck = (props) => {
    console.log(props);

    const handleCounter = (e) => {
        console.log(e);
    }

    return (
        <Container>
            <CheckBox id={props?.id} type="checkbox" onChange={handleCounter}></CheckBox>
            <Label htmlFor={props?.id}>{props?.nome} <div><i className="fa-solid fa-check"></i></div></Label>
        </Container>
    )
}

export {
    GenderCheck
}