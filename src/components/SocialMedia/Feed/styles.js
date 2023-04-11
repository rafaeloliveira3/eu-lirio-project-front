import styled from "styled-components";
import { Logo } from "../../Login/styles";

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const NavBar = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--yellow-medium);
    width: 50%;
    height: 4rem;
    border-radius: 0 0 20px 20px;
    position: fixed;
    left: 0;
    right: 0;
    transform: translate(50%);
    z-index: 999;
`
const ListContainer = styled.ul`
    display: flex;
    width: 100%;
    font-family: 'League Spartan', sans-serif;
    font-size: 1.3rem;
    justify-content: space-evenly;
    align-items: center;
    li {
        height: 100%;
        display: flex;
        flex-direction: column;
        a {
            height: 100%;
            width: 100%;
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 200ms;
            color: var(--font-color);
            padding: .5rem;
            i {
                height: 1.3rem;
                width: 1.3rem;
            }
            &:hover {
                color: var(--purple-dark);
            }
        }
    }
`

const Indicator = styled.div`
    height: .20rem;
    border-radius: 15px;
    background-color: ${(props) => props.theme.color};
`

export {
    Container,
    NavBar,
    ListContainer,
    Indicator
}