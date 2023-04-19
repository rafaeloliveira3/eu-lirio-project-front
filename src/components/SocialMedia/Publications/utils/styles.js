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
        p {
            font-weight: 600;
            font-size: 1.3rem;
        }
        span {
            font-size: 1rem;
            font-weight: 300;
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

export {
    StatsCardStyled,
    StatsCardTitle,
    StatsCardValue,
    UserCardStyled
}