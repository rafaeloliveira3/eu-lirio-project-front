import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const TypeHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    background-color: var(--yellow-medium);
    border-radius: 0px 0px 25px 25px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    color: var(--purple-dark);
    font-size: 2rem;
`
const MainForm = styled.form`
    display: flex;
    flex-grow: 1;
    padding: 2rem 5rem;
    input[type="number"] {
        -moz-appearance: textfield;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`

const CoverInputContainer = styled.div.attrs((props) => props)`
    input[type="file"]{ 
        display: none;
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 20vh;
        width: 7vw;
        background: #3818710d;
        border-radius: 20px;
        border-bottom: 2px solid var(--purple-dark);
        border-top: 2px solid var(--purple-dark);
        cursor: pointer;
        background-image: url(${(props) => props.image});
        background-position: center;
        background-size: cover;

        .label-content-container {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            border-radius: 20px;
            padding: .5rem;

            .text-container{
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                text-align: center;
                i {
                    -webkit-text-stroke: 1.5px var(--purple-dark);
                    font-size: 3rem;
                    color: #fff; 
                }
                span {
                    font-family: 'League Spartan', sans-serif;
                    font-weight: 400;
                    color: #1e1e1e66;
                }
            }
            .icon-container {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
`
const FormInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    div {
        display: flex;
        flex-direction: column;
        width: 100%;
        input {
            border: 0;
            width: 90%;
            height: 2rem;
            padding: .5rem .3rem;
            border-radius: 12px 12px 0 0;
            border-bottom: 2px solid var(--purple-dark);
        }
        textarea {
            resize: none;
            width: 100%;
            height: 7rem;
            background: #FFFFFF;
            border: 0;
            padding: .5rem .3rem;
            border-bottom: 1px solid #000000;
            border-radius: 12px 12px 0px 0px;
        }
    }
`

export {
    Container,
    TypeHeader,
    MainForm,
    CoverInputContainer,
    FormInputContainer
}