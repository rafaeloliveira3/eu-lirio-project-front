import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import { defaultUrl } from "../../helpers/url";
import { Container } from "../Section2/styles";
import { Arrows } from "./Arrows";
import { ShortCard } from "./ShortCard";
import { CarrouselContainer, Dots, DotsContainer, ShortSlideContainer } from "./styles";

export const Section3 = () => {
    const Teste = 1
    const [mostRatedShorts, setMostRatedShorts] = useState([])

    useEffect(() => {
        const getMostRatedShorts = async () => {
            const data = await axios.post(`${defaultUrl}filter-short-stories/?userId=88&bestRated=true&shortStorieTitle=`)
            .catch(err => console.log(err))

            setMostRatedShorts(data?.data)
        }
        getMostRatedShorts()
    })

    return (
        <div>
            <ShortSlideContainer>
                <h3>Confira:</h3>
                <CarrouselContainer>
                    <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={3}
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
        </div>
    )
}