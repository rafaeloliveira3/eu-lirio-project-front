import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`
const CartItemContainer = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    width: 60%;
    padding: 1rem 2rem;
`  
const BuyItensCardContainer = styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    padding: 1rem 2rem;
    width: 40%;
`
const BuyBookCard = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-top: 3px solid var(--yellow-medium);
    border-bottom: 3px solid var(--yellow-medium);
    padding: 2rem;
    border-radius: 12px;
    div {
        display: flex;
        width: 100%;
        justify-content:space-between;
        font-family: 'Sen', sans-serif;
        font-size: 1.3rem;
        .total {
            font-weight: 800;
        }
        .total-value {
            font-weight: 700;
        }
    }
    button {
        background-color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-size: 1.1rem;
        font-weight: 600;
        width: 100%;
        padding: .9rem 0;
        border-radius: 10px;
        color: var(--yellow-medium);
        border: 2px solid var(--yellow-medium);
        &:hover {
            background-color: var(--yellow-medium);
            color: #fff;
        }
    }
`

const ErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6rem;
    text-align: center;
    width: 100%;
    font-family: 'League Spartan', sans-serif;
` 

export {
    Container,
    CartItemContainer,
    BuyItensCardContainer,
    BuyBookCard,
    ErrorContainer
}