import styled from "styled-components";

const Container = styled.div`
    position: relative;
`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
`
const UserContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    .user-data {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-family: 'League Spartan', sans-serif;
        font-size: 1.1rem;
        font-weight: 400;
        img {
            height: 5rem;
            width: 5rem;
            object-fit: cover;
            border-radius: 360px;
        }
        .rating-container {
            display: flex;
            flex-direction: column;
        }
    }
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    .text-container {
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h3 {
            font-family: 'League Spartan', sans-serif;
            font-size: 1.5rem;
        }
        p {
            font-family: 'Quicksand', sans-serif;
            font-weight: 300;
        }
    }
    .extras-container {
        width: 100%;
        justify-content: space-between;
        display: flex;
        span {
            font-family: 'League Spartan', sans-serif;
            font-size: 1.1rem;
        }
    }
`

const Overlay = styled.div`
    backdrop-filter: blur(1.5rem);
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: ${props => props.theme.display};
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-family: 'League Spartan', sans-serif;
    font-size: 1.5rem;
`

export {
    Container,
    Overlay,
    Card,
    UserContainer,
    ContentContainer
}
