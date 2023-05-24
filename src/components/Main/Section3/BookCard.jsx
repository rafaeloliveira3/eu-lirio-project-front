import { BookCardStyle, PriceContainer, TitleContainer } from "./styles"

export const BookCard = (props) => {
    console.log(props.book)
    return (
        <BookCardStyle>
            <TitleContainer>
                <img src={props.book?.capa} alt="" />
                <span>{props.book?.titulo}</span>
            </TitleContainer>
            <PriceContainer>
                <span>R$ {props.book?.preco?.toFixed(2)}</span>
                <button>COMPRAR</button>
            </PriceContainer>
        </BookCardStyle>
    )
}