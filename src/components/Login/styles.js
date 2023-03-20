import { BrowserView } from "react-device-detect";
import styled from "styled-components";
import background from "../../assets/img/login_background.svg";

const Container = styled.div`
    height: 100%;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
    }
    input[type=text], input[type=password], input[type=email] {
        border: 2px solid var(--purple-dark);
        border-radius: 10px;
    }
`

// Left Side - User 

const Logo = styled.img`
    height: 12rem;
    @media (max-width: 768px) {
        height: 8rem;
    }
`
const UserArea = styled.div`
    width: 40%;
    height: 100%;
    background-color: var(--background);
    box-shadow: 0px -10px 20px 2px rgba(0, 0, 0, 0.25);
    border-radius: 0px 39px 39px 0px;
    opacity: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    p {
        font-family: 'League Spartan', sans-serif;
        font-weight: 200;
        font-size: 2rem;
        width: 70%;
        text-align: center;
    }

    @media (max-width: 768px) {
        width: 80%;
        height: fit-content;
        padding: 2rem;
        border-radius: 39px;
        gap: 1.8rem;
        p {
            font-size: 1.7rem;
        }
    }
`
const UserForms = styled.form`
    display: flex;
    font-family: 'Roboto', sans-serif;
    flex-direction: column;
    gap: 1rem;
    width: 40%;
    input {
        width: 100%;
        padding: 5px;
        height: 2.5rem;
        font-size: 1rem;
        background-color: transparent;
        font-weight: 400;
    }
    button {
        background-color: var(--purple-medium);
        color: #fff;
        font-weight: 600;
        font-size: 1.5rem;
        padding: 5px;
        height: 2.4rem;
        border: 0;
        border-radius: 30px;
        transition: all 190ms;
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.15);
        }
        &:active {
            transform: translate(0);
            box-shadow: none;
        }
    }
    @media (max-width: 768px) {
        width: 80%
    }
`

const RegisterContainer = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    font-weight: 400;
    text-align: right;
    width: 40%;
    display: flex;
    flex-direction: column;
    a {
        text-decoration:none;
        color: var(--purple-medium);
    }
    @media (max-width: 768px) {
        width: 60%;
        text-align: center;
    }
`

// Right Side - Advices
const Advices = styled(BrowserView)`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const AdvicesContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 200;
    gap: 3rem;
    
    color: var(--purple-dark);
    p {
        font-size: 4.5rem;
        width: 80%;
        text-align: center;
    }
    span {
        font-size: 2rem;
    }
`
const IconsOrganizer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 10rem;
    width: 100%;
`
const IconsContainer = styled.div`
    border: 2px solid var(--purple-dark);
    border-radius: 100%;
    height: 12rem;
    width: 12rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--purple-dark);

    i {
        font-size: 5rem;
    }
`

export {
    Container,
    Logo,
    UserArea,
    Advices,
    IconsContainer,
    IconsOrganizer,
    AdvicesContent,
    UserForms,
    RegisterContainer
}