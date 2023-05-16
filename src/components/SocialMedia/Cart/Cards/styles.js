import styled from "styled-components"

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
        height: 11rem;
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
    width: 100%;
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
    flex-wrap: wrap;
    span {
        font-family: 'Montserrat', sans-serif;
        font-size: .8rem;
        font-weight: 600;
        color: #fff;
        padding: .3rem 1rem;
        border-radius: 20px;
        background-color: var(--purple-dark)
    }
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: flex-end;
    gap: .5rem;
    font-family: 'Sen', sans-serif;
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
            font-size: 1.5rem;
        }
        button {
            background-color: transparent;
            border: 0;
            font-size: 1.2rem;
            -webkit-text-stroke: 1.5px var(--font-color);
            color: #0000;
            transition: all 100ms;
            &:hover {
                -webkit-text-stroke: 1.5px transparent;
                color: var(--font-color);
            }
        }
    }
`

export {
    ItemContainer,
    ItemText,
    GenreContainer,
    ContentContainer,
}