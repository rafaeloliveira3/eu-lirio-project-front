import styled from "styled-components";

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
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
    height: 100%;
`
const ListItem = styled.li`
    padding-top: .5rem;
    flex-direction: column;
    display: flex;
    gap: .5rem;
    align-items: center;
    justify-content: center;
    height: fit-content;
    cursor: pointer;
    h3 {
        font-weight: 500;
    }
    div {
        transition: all 100ms;
        height: 3px;
        width: 100%;
        border-radius: 10px;
        background-color: ${(props) => props.theme.bottom_color};
    }
`

export {
    Container,
    NavBar,
    ListContainer,
    ListItem
}