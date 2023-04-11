import { useEffect, useState } from "react"
import { useParams, useOutletContext } from "react-router-dom"
import axios from "axios"
import { defaultUrl } from "../../../helpers/url"
import { BookData, BookInfoSection, BookTitleAndTagsContainer, Container, ImageContainer } from "./styles"
import { Tags } from "../../Tags"
import { Rating } from "react-simple-star-rating"

export const Book = () => {
    const { id } = useParams()
    const { setAdsDisplay, setSearchbarDisplay, setFeedWidth } = useOutletContext()

    let teste = 3.6

    useEffect(() => {
        setAdsDisplay(true)
        setSearchbarDisplay(false)
        setFeedWidth(true)
    })
    const [book, setBook] = useState({})

    useEffect(() => {
        const getBookById = async () => {
            const data = await axios.get(`${defaultUrl}announcement/id/${id}`)
            .catch(err => console.log(err))

            setBook(data?.data[0])
        }
        getBookById()
    }, [id])


    return (
        <Container>
            <BookInfoSection>
                <BookData>
                    <ImageContainer>
                        <img src={book?.capa} alt="" />
                    </ImageContainer>
                    <BookTitleAndTagsContainer>
                        <div className="title-tags">
                            <div className="title">
                                <span>{book?.titulo}</span>
                            </div>
                            <div className="tags">
                                {book?.generos?.map((item) => <Tags key={item.id_genero} name={item?.nome} />)}
                            </div>
                        </div>
                    </BookTitleAndTagsContainer>
                    <Rating 
                        onClick={() => {}} 
                        allowFraction 
                        readonly 
                        initialValue={teste}
                        fillColor="var(--purple-dark)"
                        emptyStyle={{color:"#0000"}}
                        SVGstrokeColor="var(--purple-dark)"
                        SVGstorkeWidth={1}
                    />
                </BookData>
            </BookInfoSection>
        </Container>
    )
}