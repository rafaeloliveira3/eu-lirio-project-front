import styled from "styled-components";

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
    width: 100%;
    height: 4rem;
    border-radius: 0 0 20px 20px;
`
const ListContainer = styled.ul`
    display: flex;
    width: 100%;
    font-family: 'League Spartan', sans-serif;
    font-size: 1.3rem;
    justify-content: space-evenly;
    align-items: center;
    li {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        i {
            height: 1.3rem;
            width: 1.3rem;
        }
    }
`

export {
    Container,
    NavBar,
    ListContainer
}