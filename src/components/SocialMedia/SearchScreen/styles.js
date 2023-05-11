import styled, { keyframes } from "styled-components";

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
    z-index: 97;
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

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 1rem 1rem;
    overflow-y: auto;
    width: 100%;
    gap: .3rem;
`

const LoaderAnimation = keyframes`
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
`
const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50vh;
    span {
        font-size: 2rem;
        font-family: 'League Spartan', sans-serif;
        font-weight: 600;
    }
`
const Loader = styled.i`
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--purple-dark);
    animation: ${LoaderAnimation} 2s linear infinite;
`

const FilterContainer = styled.div`
    width: 100%;
    padding: 5rem 1rem 0 1rem;
    h2 {
        display: flex;
        width: min-content;
        padding: .5rem;
        align-items: center;
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        gap: .5rem;
        font-size: 1.1rem;
        cursor: pointer;
        i{
            height: 1rem;
        }
    }
`



export {
    Container,
    NavBar,
    ListContainer,
    Indicator,
    CardsContainer,
    LoaderContainer,
    Loader,
    FilterContainer
}