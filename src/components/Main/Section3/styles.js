import styled from "styled-components";

export const CarrouselContainer = styled.div`
    width: 100%;
    padding: 0 5rem;
`

export const ShortSlideContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    margin: 0 2rem;
    gap: 1rem;
    background: rgba(255, 255, 255, 0.5);
    height: 7rem;
    border-radius: 20px;
`