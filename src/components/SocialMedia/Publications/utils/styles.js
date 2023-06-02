import { Link } from "react-router-dom";
import styled from "styled-components";

const StatsCardStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.cursor};
    div {
        width: fit-content;
    }
`
const StatsCardTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .3rem;
    font-size: 1.1rem;
    font-family: 'Quicksand', sans-serif;
    font-weight: 300;
    i{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.3rem;
        height: 1.3rem;
        font-size: 1.4rem;
    }
    @media(max-width:1280px) {
        font-size: 1rem;
        i {
            width: 1rem;
            height: 1rem;
            font-size: 1.2rem;
        }
    }
`
const StatsCardValue = styled.div`
    font-size: 1.3rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    @media(max-width:1280px) {
        font-size: 1rem;
    }
`

const UserCardStyled = styled(Link)`
    display: flex;
    gap: 1rem;    
    align-items: center;
    text-decoration: none;
    color: var(--font-color);
    cursor: pointer;
    .image-container {
        img {
            height: 4rem;
            width: 4rem;
            border-radius: 360px;
            object-fit: cover;
        }
    }
    .names-container {
        font-family: 'League Spartan', sans-serif;
        display: flex;
        flex-direction: column;
        gap: .1rem;
        width: 6vw;
        p {
            font-weight: 600;
        }
        span {
            font-size: 1rem;
            font-weight: 300;
            width: max-content;
        }
    }
    @media(max-width:1280px) {
        gap: .5rem;
        .image-container {
            img {
                height: 3.2rem;
                width: 3.2rem;
            }
        }
        .names-container {
            p {
                font-size: 1rem;
            }
            span {
                font-size: .8rem;
            }
        }
    }
`
const CheckboxStyled = styled.input`
    width: 1.2rem;
    height: 1.2rem;
    appearance: none;
    margin: 0;
    border: 2px solid var(--font-color);

    font: inherit;
    color: var(--purple-dark);
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    transition: all 100ms;

    &::before {
        content: "";
        width: .65em;
        height: .65em;
        transform: scale(1);
        box-shadow: transparent;
        transform-origin: center;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    &:checked::before {
        box-shadow: inset 1em 1em #fff;
    }
    &:checked{
        border-color: #BD0020;
        background-color: #BD0020;
    }
`

const RecomendationCardContainer = styled.div`
    display: flex;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    gap: 1rem;
    padding: .5rem;
    height: 100%;
    img {
        height: 12.15rem;
        border-radius: 10px;
        width: 9rem;
        object-fit: cover;
    }
    .book-info-container {
        display: flex;
        padding: 1rem;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        .title-container {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            .title {
                font-size: 1.5rem;
                font-weight: 700;
            }
            .author {
                font-size: 1.1rem;
                font-weight: 300;
                span {
                    font-weight: 500;
                }
            }
        }
        .book-extras-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            font-size: 1.2rem;
            div {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
        }
    }
`

export {
    StatsCardStyled,
    StatsCardTitle,
    StatsCardValue,
    UserCardStyled,
    CheckboxStyled,
    RecomendationCardContainer,
}