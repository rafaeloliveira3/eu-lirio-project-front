import styled from "styled-components";

const Card = styled.div`
    background: var(--background);
    opacity: 80%;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    height: fit-content;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5rem;
    @media (max-width: 768px) {
        width: 80%;
        padding: 0 2rem;
    }
`

export {
    Card
}

