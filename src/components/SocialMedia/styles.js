import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    background-color: var(--background);
    .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 5rem;
        width: 100%;
        padding: 0 5rem;
        background-color: var(--yellow-medium);
        img {
            height: 5rem;
        }
        input {
            width: 15vw;
            height: 3vh;
            padding: 1rem;
            border: 0;
        }
        .fixer {
            width: 6%;
            height: 1rem;
        }
    }
    .user-area-container {
        display: flex;
        width: 100%;
        height: calc(100vh - 5rem);
        justify-content: space-between;
    }
`

const UserInfoContainer = styled.div`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), var(--yellow-medium);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    max-width: 25%;
    flex-grow: 1;
    padding: 0 5vw;
`
const FeedContainer = styled.div`
    flex-grow: 1;
    max-width: ${(props) => props.theme.width};
    overflow-x: auto;
`
const PromotionContainer = styled.div`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), var(--yellow-medium);
    display: ${(props) => props.theme.display};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-grow: 1;
    max-width: 25%;
`

const User = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--font-color);
    img {
        height: 5vw;
        width: 5vw;
        object-fit: cover;
        border-radius: 360px;
        border: 2px solid var(--background);
    }
    .user-info {
        display: flex;
        flex-direction: column;
        font-family: 'League Spartan', sans-serif;
        justify-content: space-evenly;
        height: 80%;
        gap: .6rem;

        .name {
            font-size: 1.8rem;
            font-weight: 600;
        }
        .userName {
            font-size: 1.2rem;
            font-weight: 300;
        }
    }
`
const NamesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: .2rem;
`
const TagsContainer = styled.div`
    display: flex;
    height: min-content;
    gap: .5rem;
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        font-weight: 600;
        border: 1.5px solid var(--purple-dark);
        color: var(--font-color);
        height: 1.7rem;
        width: 5rem;
    }
`

const OptContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
`

const UserOpt = styled.div`
    height: min-content;
    width: 100%;
    background-color: rgba(241, 241, 241, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1vh 2vw;
    border-radius: 30px;
    ul {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        width: 100%;
        
        li {
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            width: 100%;
            a {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.4vh;
                border-radius: 25px;
                width: 100%;
                &:hover {
                    background-color: #F9C73E33;
                }
            }
            i {
                font-size: clamp(1rem, 1vw, 1.3rem);
                height: 1.7rem;
                width: 1.7rem;
            }
            span {
                font-size: clamp(1rem, 1vw, 1.3rem);
                letter-spacing: 0.03rem;
            }
        }
    }
`

const ExitContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
`

const Sair = styled(Link)`
    display: flex;
    gap: .5rem;
    font-size: clamp(.5rem, 1vw, 1.1rem);
    text-decoration: none;
    color: var(--font-color);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    i {
        font-size: clamp(1rem, 1vw, 1.3rem);
    }
    &:hover {
        color: var(--purple-dark)
    }
`
const Links = styled(Link)`
    display: flex;
    gap: 2rem;
    text-decoration: none;
    color: ${(props) => props.theme.font};
    font-weight: ${(props) => props.theme.weight};
    i {
        -webkit-text-stroke: ${(props) => props.theme.icon};
        color:  ${(props) => props.theme.icon_color};
    }
`
const NewPost = styled(Link)`
    width: 100%;
    button {
        background-color: var(--purple-dark);
        width: 100%;
        color: #fff;
        border-radius: 10px;
        padding: .5rem 0;
        border: 0;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
    }
`
const SearchContainer = styled.div`
    display: ${(props) => props.theme.display};
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
    gap: .5rem;
    padding-right: .5rem;
    input {
        border-radius: 10px;
    }
    i {
        font-size: 1.2rem;
        color: var(--purple-dark);
    }
`

export {
    Container,
    UserInfoContainer,
    FeedContainer,
    PromotionContainer,
    User,
    UserOpt,
    ExitContainer,
    Sair,
    Links,
    OptContainer,
    NewPost,
    SearchContainer,
    TagsContainer,
    NamesContainer
}