import styled from "styled-components";

const LiStyled = styled.li`
    display: flex;
    gap: .5rem;
    align-items: center;
`

const CheckboxStyled = styled.input`
    width: 1.4rem;
    height: 1.4rem;
    appearance: none;
    margin: 0;
    border: 2px solid var(--font-color);

    font: inherit;
    color: var(--purple-dark);
    border-radius: 0.15em;
    transform: translateY(-0.075em);

    display: grid;
    place-content: center;

    transition: all 100ms;

    &::before {
        content: "";
        width: .65em;
        height: .65em;
        transform: scale(1);
        box-shadow: inset 1em 1em var(--font-color);
        transform-origin: center;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }
    &:checked::before {
        box-shadow: inset 1em 1em #fff;
    }
    &:checked{
        background-color: var(--font-color)
    }
`
export {
    CheckboxStyled,
    LiStyled
}