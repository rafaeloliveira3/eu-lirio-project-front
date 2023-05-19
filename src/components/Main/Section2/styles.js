import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    display: flex;
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        gap: 1rem;
        padding: 1rem 2rem;
        min-height: 15rem;
        i {
            font-size: 2rem;
            color: var(--purple-dark);
        }
        h3 {
            font-size: 1.7rem;
            font-family: 'Josefin Sans', sans-serif;
        }
        p {
            font-size: 1.3rem;
            text-align: center;
            font-family: 'Quicksand', sans-serif;
            font-weight: 300;
        }
    }
    .gray {
        background-color: transparent;
    }
`