import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    height: 100%;
    max-width: 50%;
    padding-top: 2rem;
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
            height: 5rem;
            width: 5rem;
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
        border: 1px solid var(--yellow-medium);
        border-radius: 24px;
        width: 5rem;
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
        align-items: center;
        li {
            border-radius: 360px;
            padding: .8rem;
            width: 65%;
            &:hover {
                background-color: #F9C73E33;
            }
        }
        a {
            width: 100%;
            -webkit-text-stroke: 1.5px var(--font-color);
            color: #0000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            text-decoration: none;
        }
    }
`
const StoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
` 
const StoryDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 2rem;
    font-family: 'League Spartan', sans-serif;
    font-weight: 700;
    font-size: 2rem;
    gap: 1rem;
    border-bottom: 1px solid var(--font-color);
    div {
        display: flex;
        width: 50%;
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
    width: 50vw;
    overflow-y: auto;
    #lipsum {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`

export {
    Container,
    NavBar,
    StoryContainer,
    StoryDataContainer,
    ContentContainer
}