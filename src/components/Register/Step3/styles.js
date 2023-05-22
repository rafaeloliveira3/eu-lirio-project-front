import styled from "styled-components"

const Form = styled.form`
    padding: .5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
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
    .button-submit {
        background-color: var(--purple-medium);
        color: #fff;
        font-weight: 600;
        font-size: 1.5rem;
        padding: 5px;
        height: 2.4rem;
        width: 60%;
        border: 0;
        border-radius: 30px;
        transition: all 190ms;
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0px 10px 13px 0px rgba(0, 0, 0, 0.15);
        }
        &:active {
            transform: translate(0);
            box-shadow: none;
        }
        &:disabled {
            transform: translate(0);
            opacity: 70%;
            box-shadow: none
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
    justify-content: center;
    overflow-y: auto;
` 

export {
    CheckBoxContainer,
    Form
}