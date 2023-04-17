import styled from "styled-components";

const StatsCardStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
`
const StatsCardValue = styled.div`
    font-size: 1.3rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
`

export {
    StatsCardStyled,
    StatsCardTitle,
    StatsCardValue
}