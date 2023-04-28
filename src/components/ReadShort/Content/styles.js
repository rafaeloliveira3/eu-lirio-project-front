import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    max-width: 50%;
`
const NavBar = styled.nav`
    display: flex;
    flex-direction: column;
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
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        a {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            text-decoration: none;
        }
    }
`

export {
    Container,
    NavBar
}