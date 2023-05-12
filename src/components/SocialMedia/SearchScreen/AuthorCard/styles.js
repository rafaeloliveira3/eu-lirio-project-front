import styled from "styled-components"

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
    background-color: #fff;
    padding: .5rem;
    transition: all 230ms;
    width: 100%;
    height: 12rem;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
    .user-data {
        display: flex;
        align-items: center;
        gap: 1rem;
        .image-container {
            img {
                height: 5rem;
                width: 5rem;
                object-fit: cover;
                border-radius: 360px;
            }
        }
        .names-container {
            display: flex;
            flex-direction: column;
            gap: .4rem;
            font-family: 'League Spartan', sans-serif;
            .name {
                font-size: 1.2rem;
                font-weight: 600;
            }
            .user-name {
                font-size: .9rem;
                font-weight: 300;
            }
        }
    }
    .user-extras {
        display: flex;
        justify-content: space-between;
        font-family: 'Montserrat', sans-serif;
        .genres {
            display: flex;
            gap: .5rem;
            span {
                font-size: .8rem;
                font-weight: 600;
                color: var(--font-color);
                padding: .3rem 1rem;
                border: 1px solid var(--font-color);
                border-radius: 20px;
            }
        }
        .follow {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .follow-button {
            font-weight: 600;
            background-color: ${props => props.theme.bgColor};
            color : ${props => props.theme.color};
            border: 1px solid var(--font-color);
            padding: .3rem 1rem;
            width: 8rem;
            border-radius: 20px;
        }
    }
`

export {
    ItemContainer
}