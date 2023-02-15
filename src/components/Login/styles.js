import styled from "styled-components";
import background from "../../assets/img/login_background.svg";

const Container = styled.div`
    height: 100%;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
`

// Left Side - User 

const Logo = styled.img`
    height: 12rem;
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
`
const UserForms = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

// Right Side - Advices
const Advices = styled.div`
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
    UserForms
}