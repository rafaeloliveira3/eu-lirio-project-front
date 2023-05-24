import { Footer } from "./Footer"
import { Header } from "./Header"
import { Section1 } from "./Section1"
import { Section2 } from "./Section2"
import { Section3 } from "./Section3"
import { Container } from "./styles"

export const Main = () => {
    return (
        <Container>
            <Header />
            <Section1 />
            <Section2 />
            <Section3 />
            <Footer />
        </Container>
    )
}