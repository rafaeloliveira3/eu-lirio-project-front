export const RecomendationCard = (props) => {
    const book = props.book
    console.log(book);
    return (
        <div>
            <div>
                <img src={book?.capa} alt="" />
            </div>
        </div>
    )
}