import { Container, GenreContainer, Separator, TagContainer } from "./styles"
import { Tags } from "./Tags"

export const Bookmarks = (props) => {
    return (
        <Container>
            <TagContainer>
                {
                    props.tags?.map(item => <Tags class="tag" name={item.nome_tag} key={item.id_tag} />)
                }
            </TagContainer>
            <Separator/>
            <GenreContainer>
                {
                    props.genres?.map(item => <Tags class="genre" name={item.nome_genero} key={item.id_genero} />)
                }
            </GenreContainer>
        </Container>
    )
}