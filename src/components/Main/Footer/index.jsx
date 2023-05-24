import logoIara from "../../../assets/img/logo_iara.svg"
import logo from "../../../assets/img/logo.svg"
import { Container, InfoContainer, LogosContainer } from "./styles"

export const Footer = () => {
    return (
        <Container>
             <LogosContainer>
                <div className="logo-container">
                    <img src={logo} alt="" />
                    <ul className="social-media-container">
                        <li><i className="fa-brands fa-tiktok"></i></li>
                        <li><i className="fa-brands fa-instagram"></i></li>
                        <li><i className="fa-brands fa-twitter"></i></li>
                    </ul>
                </div>
                <div className="dev-container">
                    <span>Developed by:</span>
                    <img src={logoIara} alt="" />
                </div>
             </LogosContainer>
             <InfoContainer>
                <div className="items-container">
                    <div>
                        <h3>Produto</h3>
                        <ul>
                            <li>Sobre</li>
                            <li>Website</li>
                            <li>Aplicativo Android</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Venda e Distribuição</h3>
                        <ul>
                            <li>Formas de Pagamento</li>
                            <li>Monetização</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Política</h3>
                        <ul>
                            <li>Termos e Condições</li>
                            <li>Diretrizes</li>
                            <li>Moderação e Denúncias</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright-container">
                    <span>Eu-Lírio © | Todos os Direitos Reservados</span>
                </div>
             </InfoContainer>
        </Container>
    )
}