import { Container, IconContainer, Links, LinksContainer } from "./styles"

export const Choose = () => {
    return (
        <Container>
            <h1>O QUE DESEJA PUBLICAR?</h1>
            <LinksContainer>
                <Links to="/app/new/book">
                    <IconContainer>
                        <i className="fa-solid fa-book"></i>
                    </IconContainer>
                    <span>
                        <h2>E-book</h2>
                        <p>Publique e-books dos seus livros e, assim, os deixem disponíveis na plataforma para que outras pessoas comprem.</p>
                    </span>
                </Links>
                <Links to="/app/new/short">
                    <IconContainer>
                        <i className="fa-solid fa-align-center"></i>
                    </IconContainer>
                    <span>
                        <h2>História Pequena</h2>
                        <p>Publique um conto, uma crônica, um poema ou qualquer narrativa curta e esta ficará disponível gratuitamente na plataforma, como degustação da sua arte.</p>
                    </span>
                </Links>
            </LinksContainer>
        </Container>
    )
}