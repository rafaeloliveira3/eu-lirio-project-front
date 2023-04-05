import styled from "styled-components"

const Form = styled.form`
    padding-top: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;

    h1 {
        color: var(--purple-medium);
        font-weight: 600;
        font-family: 'League Spartan', sans-serif;
        font-size: 2rem;
    }
    p {
        font-family: 'League Spartan', sans-serif;
        text-align: center;
        color: var(--purple-dark);
        font-weight: 400;
        span {
            font-weight: 600;
        }
    }
`

const CheckBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 50%;
    flex-wrap: wrap;
    padding: 1rem 0;
    gap: .5rem;
    align-items: center;
    justify-content: center
` 

export {
    CheckBoxContainer,
    Form
}