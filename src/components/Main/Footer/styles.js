import styled from "styled-components";

export const Container = styled.footer`
    background-color: var(--yellow-dark);
    display: flex;
    justify-content: space-around;
    border-top-left-radius: 30px;
    padding: 5rem;
    border-top-right-radius: 30px;
`

export const LogosContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    .logo-container {
        img {
            height: 10rem;
        }
    }
    .social-media-container {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        font-size: 2rem;
        color: var(--purple-dark);
    }
    .dev-container {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-evenly;
        span {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.1rem;
        }
        img {
            height: 7rem;
        }
    }
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    .items-container {
        display: flex;
        gap: 2rem;
        div {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
    }
`