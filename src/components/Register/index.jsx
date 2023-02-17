import { useState } from "react"
import { Card } from "../utils/card"
import { Container, Header, NavBar, OutletContainer } from "./styles"
import { Link, redirect } from "react-router-dom"
import { Outlet } from "react-router-dom";
import logoNome from '../../assets/img/nome_eulirio.svg' 

export const Register = () => {
    return (
        <Container>
            <Card>
                <NavBar>
                    <Link to={'/login'}><i className="fas fa-angle-left"></i></Link>
                </NavBar>
                <Header>
                    <img src={logoNome} alt="" />
                </Header>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </Card>
        </Container>
    )
}