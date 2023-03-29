import { Card } from "../utils/Card"
import { Container } from "./styles"

export const Published = (props) => {
    const anuncios = props.user?.anuncios
    return (
        <Container>
            {
                anuncios?.map((item) => <Card key={item.id} anuncio={item} />) 
            }
        </Container>
    )
}