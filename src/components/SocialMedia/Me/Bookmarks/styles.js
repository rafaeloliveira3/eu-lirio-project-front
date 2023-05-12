import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: max-content;
    align-items: center;
    margin-top: -15px;
    flex-direction: column;
    gap: .7rem;
    span {
        font-family: 'Montserrat', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
        width: 10rem;
        border-radius: 25px;
        border: 1.5px solid var(--purple-dark);
    }
`

const TagContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    span {
        border: 0;
        background-color: var(--purple-dark);
        font-weight: 600;
        color: #fff;
    }
`
const GenreContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    span {
        color: var(--purple-dark);
        font-weight: 500;
    }
`
const Separator = styled.div`
    height: 2.5px;
    width: 100%;
    background-color: var(--purple-dark);
`


export {
    Container,
    TagContainer,
    GenreContainer,
    Separator
}