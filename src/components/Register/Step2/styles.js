import styled from "styled-components"

const TosContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;

    p {
        text-align: end;
        display: flex;
        flex-direction: column;
        font-family: 'League Spartan', sans-serif;
        font-size: 1.2rem;
        font-weight: 300;
        a {
            font-weight: 500;
        }
    }
    input[type="checkbox"] {
        width: 1.4rem;
        height: 1.4rem;
        appearance: none;
        margin: 0;
        border: 2px solid var(--purple-dark);

        font: inherit;
        color: var(--purple-dark);
        border-radius: 0.15em;
        transform: translateY(-0.075em);

        display: grid;
        place-content: center;

        &::before {
            content: "";
            width: .65em;
            height: .65em;
            transform: scale(0);
            transition: 50ms transform linear;
            box-shadow: inset 1em 1em var(--purple-medium);
        }
        &:checked::before {
           transform: scale(1);
        }
    }
    
`

const BDate = styled.div`
    font-family: 'League Spartan', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    label {
        color: var(--purple-dark);
    }
`

const CheckBoxContainer = styled.div`
    display: flex;
    gap: 1rem;
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
    width: 5vw;
    gap: .2rem;
    border-radius: 20px;
    background-color: #fff;
    div {
        display: none;
        margin-top: -.6rem;
        margin-bottom: -.6rem;
        margin-right: -.6rem;
        height: 2.5vh;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 2.5vw;
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
    display: none;

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
    TosContainer,
    BDate,
    CheckBox,
    Label,
    CheckBoxContainer
}