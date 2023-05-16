import styled from "styled-components"
import { keyframes } from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5rem 1rem 1rem 1rem;
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
`
const Loader = styled.i`
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--purple-dark);
    animation: ${LoaderAnimation} 2s linear infinite;
`

export {
    Container,
    LoaderContainer,
    Loader
}