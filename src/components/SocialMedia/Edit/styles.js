import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 2.5rem;
    background-color: #FEFCF1;
    .button-delete {
        button {
            background: rgba(189, 0, 32, 0.04);
            border-width: 1px 0px;
            border-style: solid;
            border-color: #BD0020;
            box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
            border-radius: 10px;
            padding: .6rem 1.6rem;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            transition: all .2s;

            &:hover {
                background-color: #BD0020;
                color: #fff;
            }
        }
    }
` 

const Form = styled.form.attrs((props) => props)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;  
    gap: 2.5rem;  

    .user {
        display: flex;
        justify-content: space-between;
        width: 100%;
        input[type="file"] {
            display: none;
        }
        .image {
            height: 7rem;
            width: 7rem;
            border-radius: 360px;
            background-image: url(${(props) => props.image});
            background-position: center;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #FFFFFF;
            font-size: 1.3rem;
        }
        span {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 70%;
            gap: .2rem;
            input {
                background: #FFFFFF;
                border: 0;
                width: 100%;
                height: 2rem;
                padding: .5rem .3rem;
                border-bottom: 1px solid #000000;
                border-radius: 12px 12px 0px 0px;
                font-family: 'League Spartan', sans-serif;
            }
        }
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
        font-family: 'Quicksand', sans-serif;
        color: var(--font-color);
    }

    .select-container {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        width: 100%;
    }

    .save {
        width: 100%;
        display: flex;
        justify-content: end;
        align-items: center;

        button {
            background: #FFFFFF;
            border-width: 2px 0px;
            border-style: solid;
            border-color: var(--purple-dark);
            padding: .6rem 1.6rem;
            border-radius: 10px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            color: var(--purple-dark);
            transition: all .2s;
            &:hover {
                background-color: var(--purple-dark);
                color: #FFFFFF;
            }
        }
    }
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

const Tags = styled.div`
    font-family: 'League Spartan', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    background: #FFFFFF;
    border-bottom: 2px solid var(--font-color);
    border-top: 2px solid var(--font-color);
    border-radius: 12px;
    padding: .7rem 2rem;
    span {
        font-weight: 600;
    }
`

const TagsContainer = styled.ul`
    display: flex;
    gap: 1rem;
`

export {
    Form,
    Container,
    ModalContentContainer,
    TagsContainer,
    Tags
}