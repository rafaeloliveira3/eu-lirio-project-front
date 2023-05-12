import styled from "styled-components";

const Container = styled.main`
    display: flex;
    flex-direction: column;
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

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 1rem;
`
const SelectContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 1rem 0 0 1rem;
    select {
        font-family: 'League Spartan', sans-serif;
        font-size: 1rem;
        border: 1px solid var(--font-color);
        width: 10rem;
        padding: .5rem .2rem;
        border-radius: 10px;
    }
`

export {
    Container,
    NavBar,
    ListContainer,
    ListItem,
    CardsContainer,
    SelectContainer
}