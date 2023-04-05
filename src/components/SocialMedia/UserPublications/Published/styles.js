import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;
    width: 100%;
    max-height: 100%;
    gap: .5rem;
`
const MessageError = styled.h1`
    padding-top: 2rem;
    text-align: center;
    font-family: 'League Spartan', sans-serif;
`


export {
    Container,
    MessageError
}