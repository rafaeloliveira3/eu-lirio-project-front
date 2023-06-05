import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: var(--background);
    display: flex;
    flex-direction: column;
`
const Header = styled.header`
    display: flex;
    align-items: center;
    height: 5rem;
    width: 100%;
    padding: 0 5rem;
    background-color: var(--yellow-medium);
    img {
        height: 5rem;
    }
`
const DataContainer = styled.div`
    display: flex;
    align-items: center;
    height: 5rem;
    width: 100%;
    padding: 0 5rem;
    background-color: var(--yellow-medium);
    justify-content: space-between;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`
const AuthorData = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'League Spartan', sans-serif;
    gap: .5rem;
    justify-content: center;
    height: 100%;
    .book-name{
        font-weight: 700;
        font-size: 1.3rem;
    }
    .author-name{
        font-size: 1.1rem;
        font-weight: 200;
        span {
            font-weight: 500;
        }
    }
`

const ContentContainer = styled.div`
    width: 100%; 
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`

export {
    Container,
    Header,
    DataContainer,
    AuthorData,
    ContentContainer
}