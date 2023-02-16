import { useState } from "react"
import { Card } from "../utils/card"
import { Container, Header, NavBar } from "./styles"
import { Link, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom";
import logoNome from '../../assets/img/nome_eulirio.svg' 

export const Register = () => {
    const navigate = useNavigate()
    navigate('/register/step1')
    return (
        <Container>
            <Card>
                <NavBar>
                    <Link to={'/login'}><i className="fas fa-angle-left"></i></Link>
                </NavBar>
                <Header>
                    <img src={logoNome} alt="" />
                </Header>
                <div>
                    <Outlet />
                </div>
            </Card>
        </Container>
    )
}