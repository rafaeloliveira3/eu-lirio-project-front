import styled from "styled-components"
import background from '../../assets/img/login_background.svg' 

const Container = styled.div`
    height: 100%;
    background-image: url(${background});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    input[type=text], input[type=password], input[type=email] {
        border: 2px solid var(--purple-dark);
        border-radius: 10px;
    }
`

const NavBar = styled.nav`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    
    a {
        color: var(--purple-dark);
        i{
            font-size: 2.5rem;
        }
    }
`

const Header = styled.header`
    border-bottom: 3px solid var(--purple-dark);
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem 0;
    @media (max-width: 768px) {
        img {
            height: 3rem;
        }
    }
`

const OutletContainer = styled.div`
    width: 100%;
`

export {
    Container,
    Header,
    NavBar,
    OutletContainer
}