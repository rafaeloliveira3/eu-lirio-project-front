import { RecomendationCardContainer } from "./styles";
import { Rating } from "react-simple-star-rating";
import { Genres } from "../../Feed/Cards/Genres";
import { GenreContainer } from "../../Feed/Cards/styles";

export const RecomendationCard = (props) => {
    const book = props.book
    return (
        <RecomendationCardContainer>
            <div>
                <img src={book?.capa} alt="" />
            </div>
            <div className="book-info-container">
                <div className="title-container">
                    <span className="title">{book?.titulo}</span>
                    <span className="author">Escrito por <span>@{book?.usuario[0]?.user_name}</span></span>
                    <GenreContainer>
                        {
                            book?.generos?.map(item => <Genres key={item.id_genero} name={item.nome}/>)
                        }
                    </GenreContainer>
                </div>
                <div className="book-extras-container">
                    <span>R$ {book?.preco?.toFixed(2)}</span>
                    <div>
                        <Rating 
                        onClick={() => {}} 
                        allowFraction 
                        readonly 
                        initialValue={book?.avaliacao}
                        fillColor="var(--purple-dark)"
                        emptyStyle={{color:"#0000"}}
                        SVGstrokeColor="var(--purple-dark)"
                        SVGstorkeWidth={1}
                        size={25}
                        />
                        <span className="rating">&#8226;</span>
                        <span className="rating rating-number">{book?.avaliacao}</span>
                    </div>
                </div>
            </div>
        </RecomendationCardContainer>
    )
}