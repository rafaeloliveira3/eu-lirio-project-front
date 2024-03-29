import styled from "styled-components"
import { keyframes } from "styled-components"

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background-color: #fff;
    padding: .5rem;
    transition: all 230ms;
    width: 100%;
    height: 12rem;
    border-radius: 8px;
    cursor: pointer;
    .cover-container {
        height: 100%;
    }
    img {
        height: 100%;
        width: 9rem;
        object-fit: cover;
    }
    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }

`
const ItemText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    height: 100%;
    padding: .5rem;
    font-family: 'League Spartan', sans-serif;
    p {
        width: 100%;
        height: 2.72rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
`
const GenreContainer = styled.div`
    display: flex;
    gap: .2rem;
    span {
        font-family: 'Montserrat', sans-serif;
        font-size: .8rem;
        font-weight: 600;
        color: #fff;
        padding: .3rem 1rem;
        border-radius: 20px;
        background-color: var(--yellow-dark)
    }
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    justify-content: center;
    gap: .5rem;
`

const LikesContainer = styled.div`
    display: flex;
    gap: 1rem;
    i {
        font-size: 1.5rem;
    }
    i.fa-heart {
        color : #F93E54;
    }
    i.fa-circle-check {
        color: var(--purple-dark);
    }
    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        gap: .5rem;
    }
    .separator{
        height: 100%;
        width: 1px;
        background-color: #1e1e1e4d;
    }
`

const LoaderAnimation = keyframes`
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`
const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50vh;
`
const Loader = styled.i`
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--purple-dark);
    animation: ${LoaderAnimation} 2s linear infinite;
`
export {
    ItemContainer,
    ItemText,
    GenreContainer,
    ContentContainer,
    LikesContainer,
    Loader,
    LoaderContainer
}