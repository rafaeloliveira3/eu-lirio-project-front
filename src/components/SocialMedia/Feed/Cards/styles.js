import styled from "styled-components"

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background-color: #fff;
    padding: .5rem;
    transition: all 230ms;
    width: 100%;
    height: 12rem;
    border-radius: 8px;
    cursor: pointer;
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
const ItemText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    height: 100%;
    padding: .5rem;
    font-family: 'League Spartan', sans-serif;
    p {
        width: 100%;
        height: 2.72rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
`
const GenreContainer = styled.div`
    display: flex;
    gap: .2rem;
    span {
        font-family: 'Montserrat', sans-serif;
        font-size: .8rem;
        font-weight: 600;
        color: #fff;
        padding: .3rem 1rem;
        border-radius: 20px;
        background-color: var(--yellow-dark)
    }
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: max-content;
    justify-content: center;
    gap: .5rem;
`

const LikesContainer = styled.div`
    display: flex;
    gap: 1rem;
    button {
        border: 0;
        background-color: transparent;
    }
    i {
        font-size: 1.5rem;
    }
    i.fa-heart {
        color : #F93E54;
    }
    i.fa-circle-check {
        color: var(--purple-dark);
    }
    i.fa-bookmark {
        color: var(--yellow-medium);
    }
    .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        gap: .5rem;
    }
    .separator{
        height: 100%;
        width: 1px;
        background-color: #1e1e1e4d;
    }
`

const RecomendationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    padding: .5rem;
    transition: all 230ms;
    width: 100%;
    border-radius: 8px;
    &:hover {
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
` 
const UserContainer = styled.div`
    display: flex;
    align-items: center;
    font-family: 'League Spartan', sans-serif;
    gap: 1rem;
    cursor: pointer;
    
    .image-container {
        img {
            height: 4rem;
            width: 4rem;
            object-fit: cover;
            border-radius: 360px;
        }
    }
    .name-container {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        h3 {
            font-weight: 600;
            font-size: 1.1rem;
        }
        span {
            font-weight: 300;
            font-size: 1rem;
        }
    }
` 

const TextContainer = styled.div`
    height: max-content;
    width: 100%;
    font-family: 'Quicksand', sans-serif;
    .show-more-button {
        font-family: 'League Spartan', sans-serif;
        color: var(--purple-dark);
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`
const BookCard = styled.div`
    height: 9rem;
    display: flex;
    align-items: center;
    font-family: 'League Spartan', sans-serif;
    gap: 1rem;
    background: rgba(242, 242, 242, 0.15);
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);
    padding: .5rem;
    transition: all 230ms;
    width: 100%;
    border-radius: 8px;
    cursor: pointer;

    .image-container {
        height: 100%;
        img {
            width: 6rem;
            height: 100%;
            object-fit: cover;
        }
    }
    .book-info-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
        .title-container {
            display: flex;
            flex-direction: column;
            gap: .5rem;
            .title {
                font-size: 1.1rem;
                font-weight: 700;
            }
            .author {
                font-size: 1rem;
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
            font-size: 1.1rem;
            div {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
        }
    }
`

const SmallGenreContainer = styled.div`
    display: flex;
    gap: .2rem;
    span {
        font-family: 'Montserrat', sans-serif;
        font-size: .65rem;
        font-weight: 600;
        color: #fff;
        padding: .25rem .55rem;
        border-radius: 20px;
        background-color: var(--yellow-dark)
    }
`

const InteractionsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    .separator {
        background-color: var(--font-color);
        width: 1px;
    }
    button {
        display: flex;
        gap: .5rem;
        align-items: center;
        background-color: transparent;
        padding: .1rem;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
        border: 0;
        i {
            font-size: 1rem;
            width: 1.2rem;
            height: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        i.fa-heart {
            color : #F93E54;
        }
        i.fa-bookmark {
            color: var(--yellow-medium);
        }
    }
` 

export {
    ItemContainer,
    ItemText,
    GenreContainer,
    ContentContainer,
    LikesContainer,
    RecomendationContainer,
    UserContainer,
    TextContainer,
    BookCard,
    SmallGenreContainer,
    InteractionsContainer
}