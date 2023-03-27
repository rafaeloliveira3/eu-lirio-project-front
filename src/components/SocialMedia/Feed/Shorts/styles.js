import styled from "styled-components";

/* INDEX */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;
    width: 100%;
    gap: .5rem;
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
    Card
}