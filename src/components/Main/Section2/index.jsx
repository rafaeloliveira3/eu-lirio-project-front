import { Container } from "./styles"

export const Section2 = () => {
    return (
        <Container>
            <div className="card">
                <i class="fa-solid fa-user"></i>
                <h3>SOBRE A PLATAFORMA</h3>
                <p>Um espaço para publicação literárias de escritores independentes. Aqui nós unimos quem deseja contar uma boa história e quem deseja a conhecer.</p>
            </div>
            <div className="card gray">
                <i class="fa-solid fa-book-open"></i>
                <h3>COMO FUNCIONA?</h3>
                <p>Os escritores publicam seus livros, podendo os cobrar ou não. Os interessados, então, podem consumir as obras lançadas na plataforma.</p>
            </div>
            <div className="card">
                <i class="fa-solid fa-puzzle-piece"></i>
                <h3>INTERAÇÕES</h3>
                <p>Leitores podem fazer resenhas e avaliar as nossas obras, além de seguir seus autores favoritos e ficar por dentro dos seus lançamentos.</p>
            </div>
        </Container>
    )
}