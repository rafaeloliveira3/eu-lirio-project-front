import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: var(--background);
    .app-header {
        height: 5rem;
        width: 100%;
        img {
            height: 2rem;
        }
    }
    .user-area-container {
        display: flex;
        width: 100%;
        height: 100%;
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
    height: 100%;
    overflow-x: scroll;
`
const PromotionContainer = styled.div`
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), var(--yellow-medium);
    display: flex;
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
        height: 7rem;
        border-radius: 360px;
        border: 2px solid var(--background);
    }
    div {
        display: flex;
        flex-direction: column;
        font-family: 'League Spartan', sans-serif;
        justify-content: space-evenly;
        height: 80%;

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

const UserOpt = styled.div.attrs((props) => props)`
    height: 40%;
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
        
        li {
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            display: flex;
            width: 100%;
            a {
                padding: 1rem;
                border-radius: 25px;
                width: 100%;
                &:hover {
                    background-color: #F9C73E55;
                }
            }
            i {
                color: #0000;
                font-size: 1.3rem;
                height: 1.3rem;
                width: 1.6rem;
                -webkit-text-stroke: 2px var(--font-color);
            }
            span {
                font-size: 1.3rem;
                letter-spacing: 0.03rem;
                font-weight: 500;
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
    font-size: 1.1rem;
    text-decoration: none;
    color: var(--font-color);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    i {
        font-size: 1.3rem;
    }
    &:hover {
        color: var(--purple-dark)
    }
`
const Links = styled(Link)`
    display: flex;
    gap: 2rem;
    text-decoration: none;
    color: var(--font-color);
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
    Links
}