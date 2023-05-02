import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-width: 50%;
    padding: 2rem;
`
const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .author {
        display: flex;
        align-items: center;
        text-align: center;
        flex-direction: column;
        font-family: 'League Spartan', sans-serif;
        gap: .5rem;
        width: 100%;
        text-decoration: none;
        color: var(--font-color);

        &:hover {
            color: var(--purple-dark);
        }
        img {
            height: 7rem;
            width: 7rem;
            object-fit: cover;
            border-radius: 360px;
        }
        .author-name {
            font-size: 1.1rem;
            font-weight: 300;
            span {
                font-weight: 500;
            }
        }
    }
    .nav-bar {
        border: 2px solid var(--yellow-medium);
        border-radius: 24px;
        padding: 1rem .5rem;
        width: min-content;
        display: flex;
        flex-direction: column;
        a {
            border-radius: 360px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            text-decoration: none;
            padding: .8rem;
            i {
                -webkit-text-stroke: 1.5px var(--font-color);
                color: #0000;
            }
            &:hover {
                background-color: #F9C73E33;
            }
        }
    }
`
const StoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
` 
const StoryDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-family: 'League Spartan', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    gap: 1rem;
    div {
        display: flex;
        width: 30%;
        justify-content: space-between;
        button {
            border: 0;
            display: flex;
            align-items: center;
            gap: .5rem;
            background-color: #0000;
            font-family: 'Montserrat', sans-serif;
            i {
                font-size: 1.2rem;
            }
        }
    }
`

const ContentContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    font-family: 'Noto Serif', serif;
    width: 100%;
    overflow-y: auto;
    span {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export {
    Container,
    NavBar,
    ContentContainer,
    StoryContainer,
    StoryDataContainer
}