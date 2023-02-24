import styled from "styled-components";

const Container = styled.div`
    width: 45%;
`

const Label = styled.label`
    border: 2px solid var(--purple-medium);
    display: flex;
    justify-content: center;
    font-size: 1.2rem;
    font-family: 'League Spartan', sans-serif;
    color: var(--purple-medium);
    font-weight: 600;
    align-items: center;
    padding: .5rem;
    gap: .2rem;
    border-radius: 20px;
    background-color: #fff;
    div {
        display: none;
        margin-top: -.6rem;
        margin-bottom: -.6rem;
        margin-right: -.6rem;
        height: 5vh;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 3vw;
        color: #fff;

        align-items: center;
        i{
            font-size: 1.5rem;
            margin: auto;
        }
    }
    &:hover {
        background-color: rgba(120, 34, 190, 0.1);
    }
` 

const CheckBox = styled.input`
    appearance: none;

    &:checked + ${Label} div{
        display: flex;
        background-color: var(--purple-medium)
    }
    &:checked + ${Label} {
        justify-content: space-between;
        padding-left: 1rem;
    }
` 

export {
    CheckBox,
    Label,
    Container
}