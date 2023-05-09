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
    .fa-ellipsis-vertical {
        cursor: pointer;
        font-size: 1.1rem;
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
        gap: 1rem;
        .buttons-container {
            display: flex;
            gap: 1rem;
        }
        span {
            font-family: 'League Spartan', sans-serif;
            font-size: 1.1rem;
        }
    }
`

const ButtonExtras = styled.button`
    padding: .2rem .6rem;
    font-size: 1rem;
    background-color: transparent;
    border: 1px solid ${props => props.color};
    border-radius: 20px;
    width: 5rem;
    i {
        color: ${props => props.color}
    }
    &:hover {
        background-color: ${props => props.color};
        color: #fff;
        i {
            color: #fff;
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
    cursor: pointer;
`

const DeleteContainer = styled.div`
    display: ${(props) => props.display};
    position: absolute;
    right: 0;
    top: 1.1rem;
    span {
        i {
            color: #BD0020;
        }
        font-family: 'Quicksand', sans-serif;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: .5rem;
        border-radius: 10px;
        background-color: #fff;
        padding: .6rem;
        box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.12);
        &:hover {
            background-color: #F5F5F5;
        }
    }
`

export {
    Container,
    Overlay,
    Card,
    UserContainer,
    ContentContainer,
    ButtonExtras,
    DeleteContainer
}
