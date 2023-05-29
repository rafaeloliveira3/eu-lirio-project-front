import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { defaultUrl } from "../../helpers/url";
import { Arrows } from "./Arrows";
import { BookCard } from "./BookCard";
import { ShortCard } from "./ShortCard";
import { BooksSlideContainer, CarrouselContainer, CarrouselSpacer, Container, Dots, DotsContainer, ShortSlideContainer } from "./styles";

export const Section3 = () => {
    const [mostRatedShorts, setMostRatedShorts] = useState([])
    const [mostLikedBooks, setMostLikedBooks] = useState([])
    const [mostSoldBooks, setMostSoldBooks] = useState([])

    const [mostRatedShortsSlidesToShow, setMostRatedShortsSlidesToShow] = useState(1)
    const [mostSoldBooksSlidesToShow, setMostSoldBooksSlidesToShow] = useState(1)
    const [mostLikedBooksSlidesToShow, setMostLikedBooksSlidesToShow] = useState(1)

    useEffect(() => {
        const getMostRatedShorts = async () => {
            const data = await axios.post(`${defaultUrl}filter-short-stories/?userId=88&bestRated=true&shortStorieTitle=`)
            .catch(err => console.log(err))

            setMostRatedShortsSlidesToShow(() => {
                if (data?.data?.length >= 3)
                    return 3
                return data?.data?.length
            })
            setMostRatedShorts(data?.data)
        }
        const getMostLikedBooks = async () => {
            const data = await axios.get(`${defaultUrl}most-liked-announcements/user-id/88`)
            .catch(err => console.log(err))
            
            setMostLikedBooksSlidesToShow(() => {
                if (data?.data?.length >= 3)
                    return 3
                return data?.data?.length
            })
            setMostLikedBooks(data?.data)
        }
        const getMostSoldBooks = async () => {
            const data = await axios.get(`${defaultUrl}most-purchased-announcements/user-id/88`)
            .catch(err => console.log(err))

            setMostSoldBooksSlidesToShow(() => {
                if (data?.data?.length >= 3)
                    return 3
                return data?.data?.length
            })
            setMostSoldBooks(data?.data)
        }
        getMostRatedShorts()
        getMostLikedBooks()
        getMostSoldBooks()
    }, [1])

    return (
        <Container>
            <ShortSlideContainer id="shorts">
                <h3 className="title">Confira:</h3>
                <CarrouselContainer>
                    <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={mostRatedShortsSlidesToShow}
                    slidesToScroll={1}
                    nextArrow={<Arrows side="right"/>}
                    prevArrow={<Arrows side="left"/>}
                    appendDots={dots => (
                        <div>
                            <DotsContainer style={{ margin: "0px" }}> {dots} </DotsContainer>
                        </div>
                    )}
                    customPaging={() => (
                        <Dots>
                        <i className="fa-solid fa-circle"></i>
                        </Dots>
                    )}
                    >
                        {
                            mostRatedShorts?.map(item => <ShortCard key={item.id} story={item}/>)
                        }
                    </Slider>
                </CarrouselContainer>
            </ShortSlideContainer>
            <BooksSlideContainer id="liked">
                <h3 className="title">Livros mais curtidos:</h3>
                <CarrouselContainer>
                    <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={mostLikedBooksSlidesToShow}
                    slidesToScroll={1}
                    nextArrow={<Arrows side="right"/>}
                    prevArrow={<Arrows side="left"/>}
                    appendDots={dots => (
                        <div>
                            <DotsContainer style={{ margin: "0px" }}> {dots} </DotsContainer>
                        </div>
                    )}
                    customPaging={() => (
                        <Dots>
                        <i className="fa-solid fa-circle"></i>
                        </Dots>
                    )}
                    >
                        {
                            mostLikedBooks?.map(item => <BookCard key={item.id} book={item}/>)
                        }
                    </Slider>
                </CarrouselContainer>
            </BooksSlideContainer>
            <BooksSlideContainer id="solded">
                <h3 className="title">Livros mais vendidos:</h3>
                <CarrouselContainer>
                <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={mostSoldBooksSlidesToShow}
                    slidesToScroll={1}
                    nextArrow={<Arrows side="right"/>}
                    prevArrow={<Arrows side="left"/>}
                    appendDots={dots => (
                        <div>
                            <DotsContainer style={{ margin: "0px" }}> {dots} </DotsContainer>
                        </div>
                    )}
                    customPaging={() => (
                        <Dots>
                        <i className="fa-solid fa-circle"></i>
                        </Dots>
                    )}
                    >
                        {
                            mostSoldBooks?.map(item => <BookCard key={item.id} book={item}/>)
                        }
                    </Slider>
                </CarrouselContainer>
            </BooksSlideContainer>
        </Container>
    )
}