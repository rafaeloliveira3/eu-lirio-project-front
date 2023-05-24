import styled from "styled-components";

const Headers = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3.5rem 0;
`

const Logo = styled.img`
    height: 9rem;
`

const LinksContainer = styled.ul`
    display: flex;
    gap: 2rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    a {
        color: var(--font-color);
        text-decoration: none;
        &:hover {
            color: var(--purple-medium);
        }
    }
`

const Button = styled.button`
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.2rem;
    padding: 1.4rem 1.6rem;
    border-radius: 25px;
    background-color: var(--button-background);
    border: solid 2px var(--button-stroke);
    cursor: pointer;
    transition: transform 300ms;

    &:hover {
        transform: translateY(-.5rem)
    }
    &:active {
        transform: translateY(0)
    }
`


export {
    Logo,
    Headers,
    LinksContainer,
    Button
}