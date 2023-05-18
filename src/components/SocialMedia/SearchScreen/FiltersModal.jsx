import { useEffect, useState } from "react"
import { Checkbox } from "../Edit/utils/Checkbox"
import { defaultUrl } from "../../helpers/url"
import axios from "axios"
import { FilterContentContainer } from "./styles"

export const FiltersModal = (props) => {
    const [displayGenre, setDisplayGenre] = useState(false)
    const [displayOrder, setDisplayOrder] = useState(false)
    const [displayPrice, setDisplayPrice] = useState(false)

    const [minPrice, setMinPrice] = useState(0.00)
    const [maxPrice, setMaxPrice] = useState(0.00)

    const [bestAvaliation, setBestAvaliation] = useState(false)

    const [genres, setGenres] = useState([])

    const [genresToFilter, setGenresToFilter] = useState([])

    const jsonBuilder = () => {
        const rawArray = genresToFilter.map(genreId => {
            return genres.filter(genre => {
                return genreId === parseInt(genre.id_genero)
            })
        })
        const treatedArray = rawArray.map(item => {
            return {
                nome : item[0].nome_genero
            }
        })
        props.filter({
            genres : treatedArray,
            avaliation : bestAvaliation,
            minPrice : minPrice,
            maxPrice : maxPrice
        })
    }

    useEffect(() => {
        if (props.content === 1)
            setDisplayGenre(true)
        else
            setDisplayGenre(false)

        if (props.content === 2)
            setDisplayOrder(true)
        else
            setDisplayOrder(false)

        if (props.content === 3)
            setDisplayPrice(true)
        else
            setDisplayPrice(false)

        const fetchGenres = async () => {
            const data = await axios.get(`${defaultUrl}genres`)
            .catch(err => {console.log(err)})  
            setGenres(data?.data)
        }
        fetchGenres()
    }, [props.content])

    const handleGenres = (e) => {
        const id = +e.currentTarget.id.split('-')[1]
        if (e.currentTarget.checked) {
            setGenresToFilter([...genresToFilter, id])
        }
        else {
            let genreIndex = genresToFilter.indexOf(id)
            if (genreIndex !== -1) {
                setGenresToFilter(genresToFilter.filter((item, index) => {
                    return genreIndex !== index
                }))
            }
        }
    }
    const onGenreRender = () => {
        if (genresToFilter !== []) {
            genresToFilter.forEach(item => {
                const checkbox = document.getElementById(`genres-${item}`)
                if (checkbox)
                    checkbox.checked = true
            })
        }
    }

    return (
        <FilterContentContainer>
            {
                displayGenre ? <div className="content-container">
                    <h1>Gêneros</h1>
                    <div className="checkbox-container">{genres?.map(item => <Checkbox type="genres" id={item.id_genero} onChange={handleGenres} key={item.id_genero} name={item.nome_genero}/>)}</div>
                    {onGenreRender()}
                </div> : <></> 
            }
            {
                displayOrder ? <div className="content-container">
                    <h1>Ordem</h1>
                    <div className="radio-container">
                        <span>
                            <input checked={!bestAvaliation} onChange={() => setBestAvaliation(false)} type="radio" name="order" id="recent"/>
                            <label htmlFor="recent">Mais Recentes</label>
                        </span>
                        <span>
                            <input checked={bestAvaliation} onChange={() => setBestAvaliation(true)} type="radio" name="order" id="avaliation"/>
                            <label htmlFor="avaliation">Melhores Avaliados</label>
                        </span>
                    </div>
                </div> : <></> 
            }
            {
                displayPrice ? <div className="content-container">
                    <h1>Preço</h1>
                    <div className="price-container">
                        <span>
                            <label htmlFor="min-price">Preço Mínimo</label>
                            <input 
                                type="number" 
                                min="1" 
                                step=".01" 
                                value={minPrice}
                                id="min-price"
                                required
                                onChange={(e) => {
                                    setMinPrice(e.currentTarget.value)
                                }}
                                />
                        </span>
                        <span>
                            <label htmlFor="max-price">Preço Máximo</label>
                            <input 
                                type="number" 
                                id="max-price"
                                min="1" 
                                step=".01" 
                                value={maxPrice}
                                required
                                onChange={(e) => {
                                    setMaxPrice(e.currentTarget.value)
                                }}
                            />
                        </span>
                    </div>
                </div> : <></> 
            }
            <div className="save-container">
                <button onClick={jsonBuilder}><i className="fa-solid fa-check"></i></button>
            </div>
        </FilterContentContainer>
    )
}