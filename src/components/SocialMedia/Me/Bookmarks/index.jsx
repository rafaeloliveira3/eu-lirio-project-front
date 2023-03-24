import { Container, GenreContainer, Separator, TagContainer } from "./styles"
import { Tags } from "./Tags"

export const Bookmarks = (props) => {
    return (
        <Container>
            <TagContainer>
                {
                    props.tags?.map(item => <Tags class="tag" name={item.tag} key={item.id} />)
                }
            </TagContainer>
            <Separator/>
            <GenreContainer>
                {
                    props.genres?.map(item => <Tags class="genre" name={item.nome} key={item.id} />)
                }
            </GenreContainer>
        </Container>
    )
}