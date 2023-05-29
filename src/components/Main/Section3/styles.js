import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    padding: 2rem 5rem 0;
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

export const CarrouselContainer = styled.div`
    width: 100%;
    padding: 1rem 5rem;
    .slick-list {
        div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`

export const ShortSlideContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title {
        font-size: 2rem;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }
`
export const BooksSlideContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .title {
        font-size: 2rem;
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
    }
`
export const Arrow = styled.div`
    font-size: 1.3rem;
    color: var(--font-color);
    &:hover {
        color: #1E1E1EBB;
    }
    &::before {
        display: none;
    }
`
export const DotsContainer = styled.ul`
    li.slick-active {
        color: var(--yellow-dark);
    }
`
export const Dots = styled.div`
    font-size: .5rem;
`

export const ShortCardStyle = styled.div`
    display: flex;
    align-items: center;
    padding-left: 1rem;
    cursor: pointer;
    justify-content: space-between;
    margin: 1rem;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.5);
    height: 7rem;
    border-radius: 10px;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.15);
    span {
        display: flex;
        flex-direction: column;
        gap: .3rem;
    }
    div {
        height: 100%;
        img {
            height: 100%;
            width: 7rem;
            object-fit: cover;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    @media (max-width: 1280px) {
        font-size: .8rem;
    }
`
export const BookCardStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-family: 'Quicksand', sans-serif;
    padding: 1.5rem;
    margin: 1rem;
    width: 15rem;
    gap: 2rem;
    background: rgba(255, 255, 255, 0.5);
    max-height: 100%;
    height: min-content;
    border-radius: 10px;
    font-family: 'Quicksand', sans-serif;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.15);
    height: 27rem;
    div {
        height: 100%;
        img {
            height: 15rem;
            border-radius: 10px;
            width: 100%;
            object-fit: cover;
        }
    }
`
export const PriceContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: start;
    gap: .3rem;
    span {
        width: 100%;
        font-size: 1.1rem;
        font-weight: 500;
    }
    button {
        width: 100%;
        border-radius: 5px;
        padding: .3rem .4rem;
        border: 2px solid var(--purple-medium);
        color: var(--purple-medium);
        background: transparent;
        font-size: .8rem;
        transition: all 200ms;
        &:hover {
            background-color: var(--purple-medium);
            color: #fff;
        }
    }
`
export const TitleContainer = styled.div`
    gap: .5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
        max-width: 10rem;
        text-align: center;
        font-size: 1.1rem;
        font-weight: 600;
    }
`