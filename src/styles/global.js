import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #F2F2F2;
        --button-background: #FFDE5A;
        --button-stroke: #F9C73E;
        --purple-darken: #1B0C36;
        --purple-dark: #381871;
        --purple-medium: #7822BE;
        --yellow-medium: #FBDB5A;
        --yellow-dark: #F9C73E;

        --font-color: #1E1E1E;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    html {
        @media(max-width: 720px) {
            font-size: 87.5%;
        }
        @media(max-width: 1080px) {
            font-size: 93.75%;
        }
    }

    body {
        background-color: var(--background);
        -webkit-font-smoothing: antialiased;
        scroll-behavior: smooth;
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

    .delete-modal-overlay {
        background-color: #00000055;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 98;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .delete-modal-content {
        background-color: #fff;
        z-index: 99;
        padding: 2rem;
        height: 20rem;
        width: 30rem;
        border-radius: 10px;
    }
    
    .report-modal-overlay {
        background-color: #00000055;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 98;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .report-modal-content {
        background-color: #fff;
        z-index: 99;
        padding: 2rem;
        height: max-content;
        width: 50rem;
        border-radius: 10px;
    }

    .search-modal-overlay {
        background-color: #00000000;
        padding: 0 10rem;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 98;
        padding-top: 4rem;

        display: flex;
        justify-content: center;
    }
    .search-modal-content {
        background-color: #fff;
        z-index: 99;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
        padding: 2rem;
        height: 16rem;
        width: calc(15vw + 2.1rem);
        border-radius: 10px;
    }

    .following-modal-overlay {
        background-color: #00000002;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 99;

        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    .following-modal-content {
        background-color: var(--background);
        z-index: 99;
        padding: 2rem;
        height: calc(100% - 28rem);
        width: 50%;
        border-radius: 10px 10px 0 0;
    }

    .recomendation-modal-overlay {
        background-color: #00000055;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 98;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .recomendation-modal-content {
        background-color: #fff;
        z-index: 99;
        padding: 2rem;
        height: 35rem;
        width: 55rem;
        border-radius: 10px;
    }

    .filter-modal-overlay {
        background-color: #00000001;

        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        z-index: 99;

        padding-top: 13.3rem;

        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .filter-modal-content {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        z-index: 99;
        min-height: 20rem;
        width: 50%;
        border-radius: 10px;
    }
`