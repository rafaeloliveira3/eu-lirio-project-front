import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    background-color: var(--background);
    box-shadow: 0px 3px 6px rgba(30, 30, 30, 0.3);
    border-radius: 30px;    
    padding: 2rem 0;
    font-family: 'League Spartan', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: fit-content;
    gap: 1rem;
    h1 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        text-align: center;
    }
`
const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-right: 1.6rem;
`

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 1rem 1rem 2rem;
    background-color: #38187133;
    border-radius: 0 20px 20px 0;
    height: 100%;
    transition: 300ms;
`
const Links = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding-right: .5rem;
    gap: 1rem;
    height: 7rem;
    border-radius: 0 20px 20px 0;
    transition: background 300ms;
    i {
        font-size: 3rem;
        color: var(--purple-dark);
    }
    span {
        display: flex;
        flex-direction: column;
        color: var(--font-color);
        width:100%;
        gap: .5rem;
        h2 {
            font-weight: 700;
            font-size: 1.6rem;
        }
        p {
            font-weight: 200;
            font-size: 1.2rem;
        }
    }

    &:hover {
        background-color: #38187133;
    }
    &:hover > div{
        background-color: #38187100;
    }
`
export {
    Container,
    Links,
    IconContainer,
    LinksContainer,
}