import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 2rem 5rem 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    .main-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .span-container {
        display: flex;
        width: 100%;
        justify-content: space-around;
    }
    .text-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        font-family: 'Montserrat', sans-serif;
        h1 {
            font-size: 2.7rem;
            font-weight: 800;
        }
        span {
            text-align: center;
            width: 39rem;
            font-size: 1.5rem;
            font-weight: 300;
        }
    }
    .button-container {
        button {
            padding: 1.3rem 1.5rem;
            color: #000;
            font-size: 1rem;
            border-radius: 30px;
            background-color: var(--yellow-medium);
            border: 2px solid var(--yellow-dark);
            transition: all 300ms;
            &:hover {
                transform: translateY(-3px);
            }
        }
    }
`
const SpanButton = styled.span`
    font-family: 'League Spartan', sans-serif;
    display: flex;
    align-items: center;
    gap: .5rem;
    flex-direction: column;
    border-bottom: ${props => props.border};
    cursor: pointer;
    font-size: 1.2rem;
    i {
        font-size: 1.3rem;
    }
`
const ExampleContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    span {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: 'League Spartan', sans-serif;
        gap: .5rem;
    }
    .title {
        font-size: 1.9rem;
        font-weight: 600;
    }
    .price {
        font-size: 1.5rem;
        color: var(--purple-dark);
    }
`

export {
    Container,
    InfoContainer,
    SpanButton,
    ExampleContainer
}