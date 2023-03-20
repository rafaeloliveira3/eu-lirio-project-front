import styled from "styled-components"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
` 

const FilesInputContainer = styled.div`
    width: 100%;
    input[type="file"]{ 
        display: none;
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 17vh;
        width: 100%;
        background: #3818710d;
        border-radius: 20px;
        border-bottom: 2px solid var(--purple-dark);
        border-top: 2px solid var(--purple-dark);
        cursor: pointer;

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
export {
    FilesInputContainer,
    Container
}