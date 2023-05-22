import styled from "styled-components";

const Container = styled.div`
    width: min-content;
    display: flex;
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
    width: 13rem;
    position: relative;
    border-radius: 20px;
    background-color: #fff;
    div {
        display: none;
        position: absolute;
        height: 2.2rem;
        right: 0;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 2rem;
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
        padding-left: 1.5rem;
        justify-content: space-between;
    }
` 

export {
    CheckBox,
    Label,
    Container
}