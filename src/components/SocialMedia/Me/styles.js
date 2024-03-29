import { Link } from "react-router-dom";
import styled from "styled-components";

const MainContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const ProfileHeader = styled.header`
    background-color: var(--yellow-medium);
    border-radius: 0px 0px 25px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3vh 3vw;
    height: 23rem;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;

    .extras-container {
        height: 50%;
        align-items: flex-end;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        i {
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 1.1rem;
            height: 1.2rem;
            width: 1.2rem;
        }
    }

    .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        .follow {
            display: flex;
            gap: 1rem;
            align-items: center;
            font-family: 'Montserrat', sans-serif;
        }
        img {
            height: 10rem;
            width: 10rem;
            object-fit: cover;
            object-position: center;
            border-radius: 360px;
        }
        button {
            background-color: transparent;
            border: 2px solid var(--font-color);
            color: var(--font-color);
            padding: .5rem 4rem;
            width: 15rem;
            border-radius: 10px;
            transition: all 250ms;
            &:hover {
                background-color: var(--font-color);
                color: #fff;
            }
        }
    }
    .edit {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        height: 10rem;
        span {
            display: flex;
            flex-direction: column;
            font-family: 'League Spartan', sans-serif;
            gap: .6rem;
            h2 {
                font-size: 1.5rem;
                font-weight: 600;
            }
            h3 {
                font-size: 1.1rem;
                font-weight: 300;
            }
        }
    
    }
`
const UserMain = styled.main`
    display: flex;
    flex-direction: column;
    height: 100%;
    .text {
        .biography {
            font-family: 'Quicksand', sans-serif;
            font-size: 1.2rem;
            display: flex;
            justify-content: center;
            margin-top: -2rem;
            padding: 3rem 3vw;
            background-color: #FEFCF1;
            min-height: 10vh;
        }
    }
    .posts {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
`

const ReportContainer = styled.div`
    display: ${(props) => props.display};
    position: absolute;
    right: 0;
    top: 1.5rem;
    z-index: 50;
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

const InfoStyle = styled.div`
    display: flex;
    gap: 1rem;
    font-family: 'Montserrat', sans-serif;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        span {
            font-size: 1.3rem;
            font-weight: 700;
        }
        p {
            font-size: 1.1rem;
        }
    }
`

const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Filters = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #FEFCF1;
    height: 3rem;
    border-bottom: 2px solid var(--yellow-medium);
`

const FilterItems = styled(Link)`
    display: flex;
    align-items: center;
    height: 100%;
    color: var(--font-color);
    font-family: 'League Spartan', sans-serif;
    font-size: 1.2rem;
    gap: .8rem;
    text-decoration: none;
    i {
        font-size: 1.7rem;
    }
`

const Spacer = styled.div`
    height: 1rem;
`

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .info-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        h2 {
            font-family: 'League Spartan', sans-serif;
            font-weight: 500;
            font-size: 1.5rem;
        }
        button {
            background-color: transparent;
            border: 0;
            font-size: 1.5rem;
        }
    }
`
const UserCardsContainer = styled.div`
    width: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    font-family: 'League Spartan', sans-serif;
    h2 {
        padding-top: 2rem;
    }
`

export {
    ProfileHeader,
    UserMain,
    InfoStyle,
    TagsContainer,
    Filters,
    Spacer,
    FilterItems,
    MainContainer,
    ModalContainer,
    UserCardsContainer,
    ReportContainer
}