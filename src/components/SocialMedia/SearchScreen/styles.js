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

const FilterModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    height: 90%;
    font-family: 'Montserrat', sans-serif;
    .buttons-container {
        display: flex;
        font-weight: 300;
        border-bottom: 2px solid var(--yellow-medium);
        button {
            font-size: 1.1rem;
            padding: 1rem;
            border: 0;
        }
        .genre {
            background-color: ${props => props.buttonTheme.background.genre};
            border-top-left-radius: 10px;
        }
        .order {
            background-color: ${props => props.buttonTheme.background.order};
        }
        .price {
            background-color: ${props => props.buttonTheme.background.price};
        }
    }
`
const FilterContentContainer = styled.div`
    min-height: 17rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 2rem;
    .content-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .checkbox-container {
        flex-wrap: wrap;
        input {
            border: 2px solid var(--yellow-medium);
            &::before {
                box-shadow: inset 1em 1em #fff;
            }
            &:checked{
                background-color: var(--yellow-medium)
            }
        }
        display: flex;
        gap: 2rem;
    }
    .radio-container {
        display: flex;
        flex-direction: column;
        span {
            display: flex;
            gap: 1rem;
            input {
                accent-color: var(--yellow-medium);
            }
        }
    }
    .price-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        span {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            input {
                width: 20%;
                padding: .3rem .5rem;
                border: 2px solid var(--yellow-medium);
                border-radius: 10px;
                font-size: 1rem;
                background-color: transparent;
                font-weight: 400;
            }
        }

    }
    .save-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        button {
            border-radius: 15px;
            padding: .5rem 1rem;
            background-color: var(--purple-dark);
            color: #fff;
            font-size: 1.1rem;
            border: 0;
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
    FilterContainer,
    FilterModalContent,
    FilterContentContainer
}