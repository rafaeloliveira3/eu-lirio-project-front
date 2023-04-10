import styled from "styled-components";
import { keyframes } from "styled-components";

/* INDEX */
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
const Loader = styled.i`
    height: 90vh;
    font-size: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--purple-dark);
    animation: ${LoaderAnimation} 2s linear infinite;
`
/* SHORT ITEM */
const Card = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: .5rem;
    transition: all 230ms;
    width: 100%;
    height: 12rem;
    border-radius: 8px;
    .cover-container {
        height: 100%;
    }
    img {
        height: 100%;
        width: 9rem;
        object-fit: cover;
    }
    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
`

export {
    Container,
    Card,
    Loader
}