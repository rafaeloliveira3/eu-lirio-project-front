import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`
const ButtonSave = styled.button`
    background: #FFFFFF;
    border-width: 2px 0px;
    border-style: solid;
    border-color: var(--purple-dark);
    padding: .6rem 1.6rem;
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: var(--purple-dark);
    transition: all .2s;
    &:hover {
        background-color: var(--purple-dark);
        color: #FFFFFF;
    }
` 
const ButtonCancel = styled.button`
    background: #fff;
    border-width: 1px 0px;
    border-style: solid;
    border-color: #BD0020;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: .6rem 1.6rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    transition: all .2s;

    &:hover {
        background-color: #BD0020;
        color: #fff;
    }
` 
const ButtonsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 1rem;
` 
export {
    Container,
    ButtonCancel,
    ButtonSave,
    ButtonsContainer
}