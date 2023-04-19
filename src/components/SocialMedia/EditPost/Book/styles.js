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
    gap: 1rem;
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
    justify-content: space-evenly;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    input[type="file"]{ 
        z-index: -1;
        opacity: 0;
        width: 1px;
        height: 1px;
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 17rem;
        width: 11rem;
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
                    display: ${(props) => props.span};
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
const OptInputsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    div {
        width: 47%;
    }
`
const FormInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 70%;
    flex-grow: 1;
    gap: 1rem;
`
const GeneralDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: .3rem;
    input[type="text"], input[type="number"], select {
        border: 0;
        width: 100%;
        height: 2rem;
        padding: .5rem .3rem;
        border-radius: 12px 12px 0 0;
        border-bottom: 2px solid var(--purple-dark);
        background-color: #3818710d;
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
        background-color: #3818710d;
        font-family: 'League Spartan', sans-serif;
        font-size: 1rem;
    }
    span {
        font-family: 'League Spartan', sans-serif;
        font-weight: 700;
        color: #1B0C36;
        font-size: 1.2rem;
        i {
            color: var(--font-color);
            font-size: .7rem;
        }
    }
`
const TagsContainer = styled.div`
    font-family: 'League Spartan', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    background-color: #3818710d;
    border-bottom: 2px solid var(--purple-dark);
    border-top: 2px solid var(--purple-dark);
    border-radius: 12px;
    padding: .7rem 2rem;
    span {
        font-weight: 600;
    }
`
const Tags = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
    font-family: 'League Spartan', sans-serif;
    gap: 1rem;
    padding: 0 1rem;
    text-align: center;
    i {
        font-size: 2rem;
        color: #BD0020;
    }
    p {
        text-align: center;
        font-size: 1.2rem;
    }
    span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
        button {
            border: 0;
            background-color: #fff;
        }
        .cancelar {
            font-weight: 600;
        }
        .apagar {
            font-weight: 600;
            color: #BD0020;
        }
    }
` 
const OptContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const ToggleContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    span {
        font-family: 'Montserrat', sans-serif;    
    }
`

export {
    Container,
    TypeHeader,
    MainForm,
    CoverInputContainer,
    FormInputContainer, 
    OptInputsContainer,
    GeneralDiv,
    TagsContainer,
    Tags,
    ModalContentContainer,
    OptContainer,
    ToggleContainer
}