import { Header } from "./Header"
import { Section1 } from "./Section1"
import { Section2 } from "./Section2"
import { Container } from "./styles"

export const Main = () => {
    return (
        <Container>
            <Header />
            <Section1 />
            <Section2 />
        </Container>
    )
}