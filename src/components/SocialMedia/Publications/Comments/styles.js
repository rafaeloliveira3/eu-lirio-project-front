import styled from "styled-components";

const Container = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`

const AvaliationContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    font-family: 'League Spartan', sans-serif;
`

const FormContainer = styled.form`
    width: 100%;
    display: flex;
    gap: 2rem;
    .inputs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        width: 27rem;
        input, textarea {
            padding: .7rem .7rem;
            background-color: transparent;
            border: 1px solid var(--font-color);
            border-radius: 10px;
            font-size: 1.1rem;
        }
        textarea {
            resize: none;
            padding-bottom: 4rem;
            display: flex;
            text-align: left;
            font-family: 'League Spartan', sans-serif;
        }
    }
    .utils {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .buttons-container {
            width: 100%;
            display: flex;
            gap: 1rem;
            justify-content: space-between;
            button {
                background-color: var(--purple-dark);
                border: 0;
                padding: .5rem 1rem;
                border-radius: 30px;
                color: #fff;
                font-size: 1.5rem;
            }
        }
    }
`

export {
    Container,
    AvaliationContainer,
    FormContainer
}
