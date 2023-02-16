import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #F2F2F2;
        --button-background: #FFDE5A;
        --button-stroke: #F9C73E;
        --purple-dark: #381871;
        --purple-medium: #7822BE;
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
`