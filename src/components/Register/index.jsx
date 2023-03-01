import { Card } from "../utils/card"
import { Container, Header, NavBar, OutletContainer } from "./styles"
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";
import logoNome from '../../assets/img/nome_eulirio.svg' 
import { useState } from "react";

export const Register = () => {

    const [url, setUrl] = useState('')

    return (
        <Container>
            <Card>
                <NavBar>
                    <Link to={url}><i className="fas fa-angle-left"></i></Link>
                </NavBar>
                <Header>
                    <img src={logoNome} alt="" />
                </Header>
                <OutletContainer>
                    <Outlet context={ {setUrl} }/>
                </OutletContainer>
            </Card>
        </Container>
    )
}