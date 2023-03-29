import axios from "axios"
import { useEffect, useState } from "react"
import { defaultUrl } from "../../../helpers/url"
import { Genres } from "./Genres"
import { ContentContainer, GenreContainer, ItemContainer, ItemText, LikesContainer } from "./styles"

export const Card = (props) => {
    const [anuncio, setAnuncio] = useState({})

    useEffect(() => {
        const getAnuncio = async () => {
            const data = await axios.get(`${defaultUrl}announcement/id/${props.anuncio.id}`)
            setAnuncio(data?.data[0])
        }
        getAnuncio()
    }, [1])

    console.log(anuncio);

    return (
        <ItemContainer>
            <div className="cover-container">
                <img src={anuncio?.capa} alt="" />
            </div>
            <ItemText>
                <h2>
                    {anuncio?.titulo}
                </h2>
                <ContentContainer>
                    <GenreContainer>
                        {
                            anuncio?.generos?.map((item) => <Genres key={item.id_genero} name={item.nome} />)
                        }
                    </GenreContainer>
                    <LikesContainer>
                        <div className="icon-container">
                            <i className="fa-regular fa-heart"></i>
                            <span>570</span>
                        </div>
                        <div className="separator">

                        </div>
                        <div className="icon-container">
                            <i className="fa-regular fa-circle-check"></i>
                            <span>4,1K</span>
                        </div>
                    </LikesContainer>
                    <p>
                        {anuncio?.sinopse}
                    </p>
                </ContentContainer>
            </ItemText>
        </ItemContainer>
    )
}