import Slider from "react-slick";
import { Arrows } from "./Arrows";
import { CarrouselContainer, Dots, DotsContainer } from "./styles";

export const Carrousel = (props) => {
    return (
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
            </Slider>
        </CarrouselContainer>
    )
}