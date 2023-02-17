import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem 0;
    
    input {
        width: 100%;
        padding: 5px;
        height: 2.6rem;
        font-size: 1rem;
        background-color: transparent;
        font-weight: 400;
    }
    input[type="date"] {
        background-color: transparent;
        font-weight: 400;
        border: 2px solid var(--purple-dark);
        border-radius: 10px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 300;
        text-align: center;
        font-size: 1.2rem;
        width: fit-content;
        padding: 0 2rem;
    }
    button {
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
    button[disabled] {
        transform: translate(0);
        opacity: 70%;
        box-shadow: none;
    }
    a {
        text-decoration: none;
        color: var(--purple-medium)
    }
`

export {
    Form
}