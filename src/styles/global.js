import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #F2F2F2;
        --button-background: #FFDE5A;
        --button-stroke: #F9C73E;
        --purple-dark: #381871;
        --purple-medium: #7822BE;
        --yellow-medium: #FBDB5A;

        --font-color: #1E1E1E;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        @media(max-width: 1080px) {
            font-size: 93.75%;
        }
        @media(max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        background-color: var(--background);
        -webkit-font-smoothing: antialiased;
    }
    body, html {
        height: 100%;
        width: 100%;
    }

    body, input, textarea, button {
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }
    ul, ol {
        list-style: none;
    }
    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
    input[type=text], input[type=password], input[type=email] {
        border: 2px solid var(--purple-dark);
        border-radius: 10px;
    }

    .delete-user-modal-overlay {
        background-color: #00000055;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .delete-user-modal-content {
        background-color: #fff;
        padding: 2rem;
        height: 20rem;
        width: 30rem;
        border-radius: 10px;
    }

`