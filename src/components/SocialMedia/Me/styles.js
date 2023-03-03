import styled from "styled-components";

const ProfileHeader = styled.header`
    background-color: var(--yellow-medium);
    border-radius: 0px 0px 25px 25px;
    display: flex;
    justify-content: space-between;
    padding: 3vh 3vw;
    height: 23rem;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    z-index: 2;

    .user {
        display: flex;
        flex-direction: column;
        font-family: 'League Spartan', sans-serif;
        gap: 1rem;
        img {
            height: 10rem;
            width: 10rem;
            border-radius: 360px;
        }
        span {
            display: flex;
            flex-direction: column;
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
    .edit {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10rem;
        button {
            background-color: #F4F4F4;
            border: 0;
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
            padding: .5rem 4rem;
            border-radius: 10px;
            transition: all 250ms;
            &:hover {
                transform: translateY(-5px)
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
`

const TypeTag = () => {
    
}


const InfoStyle = styled.div`
    display: flex;
    gap: 1rem;
    font-family: 'Montserrat', sans-serif;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
            font-size: 1.3rem;
            font-weight: 700;
        }
        p {
            font-size: 1.1rem;
        }
    }
`

export {
    ProfileHeader,
    UserMain,
    InfoStyle
}